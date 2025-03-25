"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className="relative">
      <motion.span
        className={`bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 relative font-bold text-xl inline-block ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        DevSphere
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-500/20 blur-xl pointer-events-none" />
      </motion.span>
    </Link>
  );
}
