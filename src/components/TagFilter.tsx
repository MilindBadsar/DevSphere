"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function TagFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTag = searchParams.get("tag");

  const tags = [
    "javascript",
    "python",
    "react",
    "node",
    "typescript",
    "web-development",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => {
            if (currentTag === tag) {
              router.push("/questions");
            } else {
              router.push(`/questions?tag=${tag}`);
            }
          }}
          className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
            currentTag === tag
              ? "bg-purple-500 text-white"
              : "bg-white/10 text-zinc-300 hover:bg-white/20 hover:text-white"
          }`}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}
