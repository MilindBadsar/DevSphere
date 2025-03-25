"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { IconSearch } from "@tabler/icons-react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    startTransition(() => {
      router.push(`/questions?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search questions..."
        className="w-full rounded-lg bg-white/5 px-4 py-2 pl-10 text-sm text-white placeholder:text-zinc-400 border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
      />
      <IconSearch className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
    </form>
  );
}
