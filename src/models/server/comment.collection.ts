import { IndexType, Permission } from "node-appwrite";
import { db, commentCollection } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {
  await databases.createCollection(db, commentCollection, commentCollection, [
    Permission.create("users"),
    Permission.read("any"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ]);
  console.log("Comment collection created");

  await Promise.all([
    databases.createStringAttribute(
      db,
      commentCollection,
      "content",
      10000,
      true
    ),
    databases.createEnumAttribute(
      db,
      commentCollection,
      "type",
      ["question", "answer"],
      true
    ),
    databases.createStringAttribute(db, commentCollection, "typeId", 50, true),
    databases.createStringAttribute(
      db,
      commentCollection,
      "authorId",
      50,
      true
    ),
  ]);
  console.log("Answer collection attributes created");

  //creating indexes
  // await Promise.all([
  //   databases.createIndex(
  //     db,
  //     commentCollection,
  //     "content",
  //     IndexType.Fulltext,
  //     ["content"],
  //     ["asc"]
  //   ),
  //   databases.createIndex(
  //     db,
  //     commentCollection,
  //     "questionId",
  //     IndexType.Fulltext,
  //     ["authorId"],
  //     ["asc"]
  //   ),
  //   databases.createIndex(
  //     db,
  //     commentCollection,
  //     "authorId",
  //     IndexType.Fulltext,
  //     ["questionId"],
  //     ["asc"]
  //   ),
  // ]);
  // console.log("Answer collection indexes created");
}
