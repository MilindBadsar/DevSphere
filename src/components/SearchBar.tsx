"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/questions?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/questions");
    }
  };

  return (
    <div className="flex gap-3 w-full lg:col-span-3">
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search questions..."
          className="w-full bg-black/80 text-white rounded-xl px-4 py-3.5 pl-12 ring-2 ring-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500/30 placeholder:text-zinc-400 transition-all"
        />
        <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
      </div>
      <button
        onClick={handleSearch}
        className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold text-center overflow-hidden whitespace-nowrap transition-all duration-200 hover:opacity-80"
      >
        <div className="absolute inset-0 bg-black/20 transition-opacity opacity-0 group-hover:opacity-100" />
        <motion.span
          initial={{ y: 0 }}
          whileHover={{ y: -2 }}
          className="relative inline-block"
        >
          Search
        </motion.span>
      </button>
    </div>
  );
}
