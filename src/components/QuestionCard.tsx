"use client";

import React from "react";
import { BorderBeam } from "./magicui/border-beam";
import Link from "next/link";
import { Models } from "appwrite";
import slugify from "@/utils/slugify";
import { avatars } from "@/models/client/config";
import convertDateToRelativeTime from "@/utils/relativeTime";
import { motion } from "framer-motion";

const QuestionCard = ({ ques }: { ques: Models.Document }) => {
  const [height, setHeight] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, [ref]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div
        ref={ref}
        className="relative flex flex-col gap-4 overflow-hidden rounded-xl 
        border border-white/10 bg-black/40 backdrop-blur-xl p-6 
        transition-all duration-200 hover:bg-black/60 sm:flex-row"
      >
        <BorderBeam size={height} duration={12} delay={9} />

        <div className="relative shrink-0 text-sm sm:text-right space-y-2">
          <p className="flex items-center gap-2 text-zinc-400">
            <span className="text-xl font-semibold text-purple-500">
              {ques.totalVotes}
            </span>
            votes
          </p>
          <p className="flex items-center gap-2 text-zinc-400">
            <span className="text-xl font-semibold text-blue-500">
              {ques.totalAnswers}
            </span>
            answers
          </p>
        </div>

        <div className="relative w-full space-y-4">
          <Link
            href={`/questions/${ques.$id}/${slugify(ques.title)}`}
            className="group block"
          >
            <h2
              className="text-xl font-semibold text-white group-hover:text-purple-400 
            transition-colors duration-200"
            >
              {ques.title}
            </h2>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            {ques.tags.map((tag: string) => (
              <Link
                key={tag}
                href={`/questions?tag=${tag}`}
                className="rounded-full bg-zinc-800/50 px-3 py-1 text-zinc-300 
                transition-colors hover:bg-purple-500/20 hover:text-purple-400"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
            <div className="flex items-center gap-2 ml-auto">
              <picture>
                <img
                  src={avatars.getInitials(ques.author.name, 24, 24).href}
                  alt={ques.author.name}
                  className="rounded-full border border-white/10"
                />
              </picture>
              <Link
                href={`/users/${ques.author.$id}/${slugify(ques.author.name)}`}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                {ques.author.name}
              </Link>
              <span className="px-2 py-1 rounded-full bg-zinc-800/50 text-xs">
                {ques.author.reputation}
              </span>
            </div>
            <span className="text-zinc-500">
              asked {convertDateToRelativeTime(new Date(ques.$createdAt))}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
