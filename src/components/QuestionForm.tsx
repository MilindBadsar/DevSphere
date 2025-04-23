"use client";

import { Meteors } from "@/components/magicui/meteors";
import { useAuthStore } from "@/store/Auth";
import { cn } from "@/lib/utils";
import slugify from "@/utils/slugify";
import { Models, ID } from "appwrite";
import { useRouter } from "next/navigation";
import React from "react";
import { databases, storage } from "@/models/client/config";
import {
  db,
  questionAttachmentBucket,
  questionCollection,
} from "@/models/name";
import { motion } from "framer-motion";

// const LabelInputContainer = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   return (
//     <div
//       className={cn(
//         "relative flex w-full flex-col space-y-2 overflow-hidden rounded-xl border border-white/20 bg-slate-950 p-4",
//         className
//       )}
//     >
//       <Meteors number={30} />
//       {children}
//     </div>
//   );
// };

/**
 * ******************************************************************************
 * ![INFO]: for buttons, refer to https://ui.aceternity.com/components/tailwindcss-buttons
 * ******************************************************************************
 */
export default function QuestionForm({
  question,
}: {
  question?: Models.Document;
}) {
  const { user } = useAuthStore();
  // const [tag, setTag] = React.useState("");
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    title: String(question?.title || ""),
    content: String(question?.content || ""),
    authorId: user?.$id,
    tags: new Set((question?.tags || []) as string[]),
    attachment: null as File | null,
  });

  const [loading, setLoading] = React.useState(false);
  const [_error, setError] = React.useState("");

  const loadConfetti = (timeInMS = 3000) => {
    const end = Date.now() + timeInMS; // 3 seconds
    // const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      // Confetti({
      //   particleCount: 2,
      //   angle: 60,
      //   spread: 55,
      //   startVelocity: 60,
      //   origin: { x: 0, y: 0.5 },
      //   colors: colors,
      // });
      // Confetti({
      //   particleCount: 2,
      //   angle: 120,
      //   spread: 55,
      //   startVelocity: 60,
      //   origin: { x: 1, y: 0.5 },
      //   colors: colors,
      // });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const create = async () => {
    if (!formData.attachment) throw new Error("Please upload an image");

    const storageResponse = await storage.createFile(
      questionAttachmentBucket,
      ID.unique(),
      formData.attachment
    );

    const response = await databases.createDocument(
      db,
      questionCollection,
      ID.unique(),
      {
        title: formData.title,
        content: formData.content,
        authorId: formData.authorId,
        tags: Array.from(formData.tags),
        attachmentId: storageResponse.$id,
      }
    );

    loadConfetti();

    return response;
  };

  const update = async () => {
    if (!question) throw new Error("Please provide a question");

    const attachmentId = await (async () => {
      if (!formData.attachment) return question?.attachmentId as string;

      await storage.deleteFile(questionAttachmentBucket, question.attachmentId);

      const file = await storage.createFile(
        questionAttachmentBucket,
        ID.unique(),
        formData.attachment
      );

      return file.$id;
    })();

    const response = await databases.updateDocument(
      db,
      questionCollection,
      question.$id,
      {
        title: formData.title,
        content: formData.content,
        authorId: formData.authorId,
        tags: Array.from(formData.tags),
        attachmentId: attachmentId,
      }
    );

    return response;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.authorId) {
      setError(() => "Please fill out all fields");
      return;
    }

    setLoading(() => true);
    setError(() => "");

    try {
      const response = question ? await update() : await create();

      router.push(`/questions/${response.$id}/${slugify(formData.title)}`);
    } catch (error: any) {
      setError(() => error.message);
    }

    setLoading(() => false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setFormData((prev) => ({
      ...prev,
      attachment: files[0],
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({
      ...prev,
      tags: new Set(tags),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <label className="block text-lg font-medium text-white/90">
          Title
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="mt-2 w-full rounded-lg bg-zinc-900 px-4 py-3 text-white/90 border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
            placeholder="What's your programming question?"
            required
          />
        </label>

        <label className="block text-lg font-medium text-white/90">
          Question Details
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className="mt-2 w-full rounded-lg bg-zinc-900 px-4 py-3 text-white/90 border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
            placeholder="Describe your question in detail..."
            required
          />
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="block text-lg font-medium text-white/90">
            Image
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="mt-2 w-full rounded-lg bg-zinc-900 px-4 py-3 text-white/90 border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
            />
          </label>

          <label className="block text-lg font-medium text-white/90">
            Tags
            <input
              type="text"
              value={Array.from(formData.tags).join(", ")}
              onChange={handleTagsChange}
              className="mt-2 w-full rounded-lg bg-zinc-900 px-4 py-3 text-white/90 border border-white/10 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
              placeholder="Add tags (comma separated)"
            />
          </label>
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full md:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold text-lg hover:opacity-90 transition-opacity"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Publishing...
          </span>
        ) : (
          "Publish Question"
        )}
      </motion.button>
    </form>
  );
}
