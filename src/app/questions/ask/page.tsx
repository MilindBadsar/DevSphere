"use client";

import QuestionForm from "@/components/QuestionForm";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { RetroGrid } from "@/components/magicui/retro-grid";
import Link from "next/link";

export default function AskQuestion() {
  const { user, isLoading, verifySession } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    verifySession();
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, router, isLoading]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="glass-morphism p-6 rounded-xl">
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black/95 relative flex flex-col">
      <DotPattern
        size={24}
        radius={1.2}
        className="fixed inset-0 w-full h-full opacity-40 text-white/[0.15] pointer-events-none"
      />

      <main className="flex-1 container mx-auto px-4 py-24">
        <Particles
          className="absolute inset-0"
          quantity={50}
          ease={100}
          color="#ffffff"
          refresh={false}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-6xl mx-auto"
        >
          {/* Header Section with Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Title Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-4xl font-bold tracking-tight gradient-text">
                Ask a Question
              </h1>
            </motion.div>

            {/* Guidelines Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-morphism p-6 rounded-xl space-y-3"
            >
              <h2 className="text-xl font-semibold text-white/90">
                Writing a good question
              </h2>
              <div className="text-white/70 text-sm">
                <p>Steps to write an effective question:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Summarize your problem in a one-line title</li>
                  <li>Describe your problem in more detail</li>
                  <li>Add code examples if relevant</li>
                  <li>Add tags to help others find and answer your question</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Question Form Section - Unchanged */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-morphism p-8 rounded-xl"
          >
            <style jsx global>
              {`
                .question-form textarea {
                  font-size: 1.125rem !important;
                  line-height: 1.75rem !important;
                  min-height: 200px !important;
                }
                .question-form input[type="text"] {
                  font-size: 1.125rem !important;
                  line-height: 1.75rem !important;
                }
                .markdown-preview {
                  font-size: 1.125rem !important;
                  line-height: 1.75rem !important;
                }
              `}
            </style>
            <div className="question-form">
              <QuestionForm />
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Updated Footer */}
      <footer className="border-t border-white/10 bg-black/95 backdrop-blur-xl w-full mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-12 gap-12">
            {/* Logo and Description Column - Takes 6 columns */}
            <div className="col-span-12 md:col-span-6 space-y-6">
              <div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 relative">
                  DevSphere
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-500/20 blur-xl" />
                </span>
              </div>
              <p className="text-sm text-zinc-400 max-w-md">
                A community-driven platform where developers <br /> learn,
                share, and build together.
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500"></div>
              </div>
            </div>

            {/* Navigation Links - Takes 3 columns */}
            <div className="col-span-6 md:col-span-3 space-y-4">
              <h3 className="text-lg font-semibold text-white">Navigate to</h3>
              <nav className="space-y-3">
                <Link
                  href="/"
                  className="block text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/questions"
                  className="block text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Questions
                </Link>
                <Link
                  href="/questions/ask"
                  className="block text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Ask Question
                </Link>
                <Link
                  href="/profile"
                  className="block text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Profile
                </Link>
              </nav>
            </div>

            {/* Contact Links - Takes 3 columns */}
            <div className="col-span-6 md:col-span-3 space-y-4">
              <h3 className="text-lg font-semibold text-white">Connect</h3>
              <nav className="space-y-3">
                <a
                  href="mailto:your@email.com"
                  className="block text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Email
                </a>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://twitter.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </nav>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-zinc-400">
            Built with ❤️ for developers
          </div>
        </div>
      </footer>
    </div>
  );
}
