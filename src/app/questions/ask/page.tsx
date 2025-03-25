"use client";

import QuestionForm from "@/components/QuestionForm";
import { motion } from "framer-motion";
import { Particles } from "@/components/magicui/particles";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
    <main className="container mx-auto min-h-screen px-4 py-24">
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
  );
}
