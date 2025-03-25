"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Particles } from "@/components/magicui/particles";

export default function Home() {
  return (
    <div className="fixed inset-0 bg-black">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={100}
        color="#ffffff"
        refresh={true}
      />

      <main className="h-full flex flex-col items-center justify-center p-6 relative">
        <motion.div className="glass-morphism p-8 sm:p-12 space-y-8 max-w-4xl w-full rounded-2xl relative">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/20 to-blue-500/20 opacity-50 blur-xl" />

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 relative">
              DevSphere
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-500/20 blur-xl" />
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-zinc-400 text-center max-w-2xl mx-auto relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Join the next generation of developers sharing knowledge and
            building the future
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/questions"
              className="group relative w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-white transition-opacity opacity-0 group-hover:opacity-20" />
              <motion.span
                initial={{ y: 0 }}
                whileHover={{ y: -2 }}
                className="relative inline-block"
              >
                Browse Questions
              </motion.span>
            </Link>

            <Link
              href="/questions/ask"
              className="group relative w-full sm:w-auto px-8 py-3 rounded-xl bg-black text-white font-semibold text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-500/50 opacity-0 group-hover:opacity-20 transition-opacity" />
              <motion.span
                initial={{ y: 0 }}
                whileHover={{ y: -2 }}
                className="relative inline-block"
              >
                Ask a Question
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 w-full max-w-6xl px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group glass-morphism p-6 rounded-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-500/20 opacity-0 group-hover:opacity-50 transition-opacity" />
              <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 relative z-10">
                {feature.title}
              </h3>
              <p className="text-zinc-400 relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}

const features = [
  {
    title: "Real-time Collaboration",
    description: "Get instant answers and feedback from developers worldwide.",
  },
  {
    title: "Smart Search",
    description:
      "Find solutions quickly with our advanced search capabilities.",
  },
  {
    title: "Modern Experience",
    description:
      "Enjoy a beautiful, intuitive interface designed for developers.",
  },
];
