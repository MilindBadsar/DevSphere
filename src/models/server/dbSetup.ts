import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateDB() {
  try {
    await databases.get(db);
    console.log("Database connection established");
  } catch (error) {
    console.error(error);
    try {
      await databases.create(db, db);
      console.log("Database created");

      await Promise.all([
        createQuestionCollection(),
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
      ]);
      console.log("Collections created");
      console.log("Database setup completed");
    } catch (error) {
      console.log("Error in creating database", error);
    }
  }
  return databases;
}
