"use client";

import { useEffect, useState } from "react";
import { databases, users } from "@/models/server/config";
import {
  answerCollection,
  db,
  voteCollection,
  questionCollection,
} from "@/models/name";
import { Query } from "node-appwrite";
import { Models } from "appwrite";
import React from "react";
import Link from "next/link";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import QuestionCard from "@/components/QuestionCard";
import { UserPrefs } from "@/store/Auth";
import Pagination from "@/components/Pagination";
import { Search } from "./Search";
import { motion } from "framer-motion";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { AnimatedList } from "@/components/magicui/animated-list";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "@/components/SearchBar";
import { TagFilter } from "@/components/TagFilter";
import { timeAgo } from "@/utils/timeAgo";
import Footer from "@/app/components/Footer";
import { Logo } from "@/components/Logo";
import { RetroGrid } from "@/components/magicui/retro-grid";

// Update the Question interface to only include required fields
interface Question extends Models.Document {
  title: string;
  content: string;
  tags: string[];
}

// Update example questions with simplified structure and add new questions
const exampleQuestions: Question[] = [
  {
    $id: "example1",
    title: "What is the difference between deep learning and machine learning?",
    content:
      "I'm trying to understand the key differences between deep learning and machine learning...",
    tags: ["machine-learning", "deep-learning", "ai"],
  },
  {
    $id: "example2",
    title: "How does a blockchain work and what are its main use cases?",
    content:
      "Looking to understand the fundamental concepts of blockchain technology...",
    tags: ["blockchain", "cryptocurrency", "web3"],
  },
  {
    $id: "example3",
    title:
      "What are the key differences between Python and JavaScript for web development?",
    content:
      "I'm deciding which language to learn first for web development...",
    tags: ["python", "javascript", "web-development"],
  },
  {
    $id: "example4",
    title:
      "What are the best practices for securing a web application against common vulnerabilities?",
    content: "Looking for comprehensive security best practices...",
    tags: ["security", "web-development", "best-practices"],
  },
  {
    $id: "example5",
    title: "How can I optimize the performance of a React application?",
    content: "Seeking ways to improve React app performance...",
    tags: ["react", "performance", "optimization"],
  },
  {
    $id: "example6",
    title: "What is the importance of responsive design in web development?",
    content: "Understanding the significance of responsive design...",
    tags: ["responsive-design", "web-development", "ui-ux"],
  },
  {
    $id: "example7",
    title: "What are RESTful APIs, and how do they differ from SOAP APIs?",
    content: "Comparing REST and SOAP architectures...",
    tags: ["api", "rest", "soap"],
  },
  {
    $id: "example8",
    title:
      "How can I deploy a machine learning model to production using cloud services?",
    content: "Looking for deployment strategies for ML models...",
    tags: ["machine-learning", "cloud", "deployment"],
  },
  {
    $id: "example9",
    title: "What is the role of DevOps in software development?",
    content: "Understanding DevOps principles and practices...",
    tags: ["devops", "software-development", "ci-cd"],
  },
  {
    $id: "example10",
    title: "What are the main differences between SQL and NoSQL databases?",
    content: "Comparing SQL and NoSQL database systems...",
    tags: ["sql", "nosql", "databases"],
  },
];

export default function QuestionsPage() {
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [randomQuestions, setRandomQuestions] = useState<Question[]>([]);

  const page = searchParams.get("page") || "1";
  const tag = searchParams.get("tag");
  const search = searchParams.get("search");

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const queries = [
          Query.orderDesc("$createdAt"),
          Query.offset((+page - 1) * 25),
          Query.limit(25),
        ];

        if (tag) {
          queries.push(Query.equal("tags", [tag]));
        }

        if (search) {
          queries.push(
            Query.or([
              Query.search("title", search),
              Query.search("content", search),
            ])
          );
        }

        const response = await databases.listDocuments<Question>(
          db,
          questionCollection,
          queries
        );

        const enhancedQuestions = await Promise.all(
          response.documents.map(async (ques: Question) => {
            try {
              const [author, answers, votes] = await Promise.all([
                users.get<UserPrefs>(ques.authorId),
                databases.listDocuments(db, answerCollection, [
                  Query.equal("questionId", ques.$id),
                  Query.limit(1),
                ]),
                databases.listDocuments(db, voteCollection, [
                  Query.equal("type", "question"),
                  Query.equal("typeId", ques.$id),
                  Query.limit(1),
                ]),
              ]);

              return {
                ...ques,
                totalAnswers: answers.total,
                totalVotes: votes.total,
                author: {
                  $id: author.$id,
                  reputation: author.prefs?.reputation || 0,
                  name: author.name,
                },
              };
            } catch (error) {
              console.error(`Error enhancing question ${ques.$id}:`, error);
              return ques; // Return original question if enhancement fails
            }
          })
        );

        setQuestions(enhancedQuestions);

        // Fetch random questions with proper typing
        const randomResponse = await databases.listDocuments<Question>(
          db,
          questionCollection,
          [Query.orderDesc("$createdAt"), Query.limit(5)]
        );

        setRandomQuestions(randomResponse.documents);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [page, tag, search]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="glass-morphism p-6 rounded-xl">
          <p className="text-white/70">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black/95 relative">
      <DotPattern
        size={24}
        radius={1.2}
        className="fixed inset-0 w-full h-full opacity-40 text-white/[0.15] pointer-events-none"
      />

      {/* Main Content */}
      <TracingBeam className="max-w-7xl mx-auto px-4 flex-1">
        <main className="pt-24 pb-32 relative z-10">
          {/* Search Bar Section */}
          <div className="flex-1 grid lg:grid-cols-4 gap-6 mb-8">
            <SearchBar />
          </div>

          <div className="flex gap-6">
            <div className="flex-1 grid lg:grid-cols-4 gap-6">
              {/* Main Questions Column */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                    Top Questions
                  </h1>
                  <TagFilter />
                </div>

                <div className="space-y-4">
                  {[...exampleQuestions, ...questions.slice(0, 5)].map(
                    (question) => (
                      <Link
                        key={question.$id}
                        href={`/questions/${question.$id}`}
                        className="block glass-morphism p-6 rounded-xl hover:bg-white/[0.03] transition-all duration-200"
                      >
                        <h3 className="text-lg font-medium text-white/90 mb-4">
                          {question.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {question.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs rounded-full bg-white/[0.05] text-purple-300"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>

              {/* Right Sidebar */}
              <div>
                <div className="glass-morphism p-6 rounded-xl border border-white/[0.05]">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-white">
                      Latest Questions
                    </h2>
                    <span className="px-2.5 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 font-medium">
                      Live
                    </span>
                  </div>
                  <div className="space-y-4">
                    {randomQuestions.map((q, i) => (
                      <Link
                        key={q.$id}
                        href={`/questions/${q.$id}`}
                        className="block p-4 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200"
                      >
                        <h4 className="text-sm text-zinc-200 hover:text-purple-400 line-clamp-2">
                          {q.title}
                        </h4>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {q.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs rounded-full bg-white/[0.05] text-purple-300"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </TracingBeam>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black/95 backdrop-blur-md mt-auto">
        {/* Footer Content First */}
        <div className="max-w-7xl mx-auto px-4 py-4 relative z-20">
          <div className="flex flex-col items-center gap-6 mb-8">
            <Logo className="text-2xl" />
            <p className="text-sm text-zinc-400">
              Where developers learn, share, & build together
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="text-sm font-medium text-white mb-3">DevSphere</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/questions">Questions</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <Link href="/help">Help Center</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Connect</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <Link href="/github">GitHub</Link>
                </li>
                <li>
                  <Link href="/discord">Discord</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 pt-4  text-center text-sm text-zinc-400">
            Built with ❤️ for developers
          </div>
        </div>

        {/* RetroGrid at Bottom */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <RetroGrid
            className="absolute inset-0 opacity-60"
            cellWidth={60}
            cellHeight={60}
            minSize={0.6}
            initVelocity={0}
            duration={25000}
            cellLineWidth={1}
            cellLineColor="rgba(255,255,255,0.7)"
          />
        </div>
      </footer>
    </div>
  );
}
