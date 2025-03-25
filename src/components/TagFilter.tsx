"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { IconTags } from "@tabler/icons-react";

export function TagFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [selectedTag, setSelectedTag] = useState(searchParams.get("tag") || "");

  const handleTagChange = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    startTransition(() => {
      router.push(`/questions?${params.toString()}`);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <IconTags className="h-4 w-4 text-zinc-400" />
      <select
        value={selectedTag}
        onChange={(e) => handleTagChange(e.target.value)}
        className="rounded-lg bg-white/5 px-3 py-2 text-sm text-white border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
      >
        <option value="">All Tags</option>
        <option value="javascript">JavaScript</option>
        <option value="react">React</option>
        <option value="nextjs">Next.js</option>
        {/* Add more tags as needed */}
      </select>
    </div>
  );
}
