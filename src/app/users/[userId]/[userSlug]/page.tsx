import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { MagicCard, MagicContainer } from "@/components/magicui/magic-card";
import { NumberTicker } from "@/components/magicui/number-ticker";
import {
  answerCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/name";
import { Query } from "node-appwrite";
import { DotPattern } from "@/components/magicui/dot-pattern";
import Link from "next/link";
import EditButton from "./EditButton";

const Page = async ({}: // params,
{
  // params: { userId: string; userSlug: string };
}) => {
  const [user, questions, answers, votes] = await Promise.all([
    users.get<UserPrefs>("params.userId"),
    databases.listDocuments(db, questionCollection, [
      Query.equal("authorId", "params.userId"),
      Query.orderDesc("$createdAt"),
      Query.limit(5),
    ]),
    databases.listDocuments(db, answerCollection, [
      Query.equal("authorId", "params.userId"),
      Query.orderDesc("$createdAt"),
      Query.limit(5),
    ]),
    databases.listDocuments(db, voteCollection, [
      Query.equal("votedById", "params.userId"),
      Query.equal("voteStatus", "upvote"),
    ]),
  ]);

  return (
    <div className="min-h-screen bg-black/95 relative">
      <DotPattern
        size={24}
        radius={1.2}
        className="fixed inset-0 w-full h-full opacity-40 text-white/[0.15] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto pt-24 px-6 space-y-12">
        <div className="glass-morphism p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-500/20 opacity-50 blur-xl" />
          <div className="relative z-10 flex items-start gap-8">
            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {user.name}
              </h1>
              <p className="text-lg text-gray-500">{user.email}</p>
              <br />
              <p className="text-zinc-400 mb-4">
                Joined in{" "}
                {new Date(user.$createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              {user.prefs?.bio && (
                <p className="text-zinc-300 max-w-2xl">{user.prefs.bio}</p>
              )}
            </div>
            <div className="shrink-0">
              <EditButton />
            </div>
          </div>
        </div>

        <MagicContainer className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <MagicCard className="group relative flex flex-col items-center justify-center p-8 shadow-2xl overflow-hidden rounded-2xl text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-0 transition-opacity" />
            <h2 className="text-xl font-medium mb-4 text-white/80">
              Reputation
            </h2>
            <div className="flex items-center justify-center">
              <p className="text-5xl font-medium text-white">
                <NumberTicker value={user.prefs?.reputation || 0} />
              </p>
            </div>
          </MagicCard>

          <MagicCard className="group relative flex flex-col items-center justify-center p-8 shadow-2xl overflow-hidden rounded-2xl text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-0 transition-opacity" />
            <h2 className="text-xl font-medium mb-4 text-white/80">
              Questions Asked
            </h2>
            <div className="flex items-center justify-center">
              <p className="text-5xl font-medium text-white">
                <NumberTicker value={questions.total} />
              </p>
            </div>
          </MagicCard>

          <MagicCard className="group relative flex flex-col items-center justify-center p-8 shadow-2xl overflow-hidden rounded-2xl text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-0 transition-opacity" />
            <h2 className="text-xl font-medium mb-4 text-white/80">Answered</h2>
            <div className="flex items-center justify-center">
              <p className="text-5xl font-medium text-white">
                <NumberTicker value={answers.total} />
              </p>
            </div>
          </MagicCard>

          <MagicCard className="group relative flex flex-col items-center justify-center p-8 shadow-2xl overflow-hidden rounded-2xl text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-0 transition-opacity" />
            <h2 className="text-xl font-medium mb-4 text-white/80">
              Upvotes Received
            </h2>
            <div className="flex items-center justify-center">
              <p className="text-5xl font-medium text-white">
                <NumberTicker value={votes.total} />
              </p>
            </div>
          </MagicCard>
        </MagicContainer>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-6">
              Recent Questions
            </h2>
            {questions.documents.map((question) => (
              <Link key={question.$id} href={`/questions/${question.$id}`}>
                <MagicCard className="p-6 group hover:scale-[1.02] transition-all duration-300">
                  <h3 className="text-lg text-zinc-200 group-hover:text-white transition-colors">
                    {question.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2">
                    {new Date(question.$createdAt).toLocaleDateString()}
                  </p>
                </MagicCard>
              </Link>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white mb-6">
              Recent Answers
            </h2>
            {answers.documents.map((answer) => (
              <MagicCard
                key={answer.$id}
                className="p-6 group hover:scale-[1.02] transition-all duration-300"
              >
                <p className="text-zinc-200 line-clamp-2">{answer.content}</p>
                <p className="text-sm text-zinc-400 mt-2">
                  {new Date(answer.$createdAt).toLocaleDateString()}
                </p>
              </MagicCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
