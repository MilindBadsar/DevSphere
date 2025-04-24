import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import React from "react";
import EditQues from "./EditQues";

export default async function Page({
  params,
}: {
  params: { quesId: string; quesName: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const question = await databases.getDocument(
    db,
    questionCollection,
    params.quesId
  );

  return <EditQues question={question} />;
}
