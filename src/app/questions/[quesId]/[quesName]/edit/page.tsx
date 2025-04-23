import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import React from "react";
import EditQues from "./EditQues";

type EditPageParams = {
  quesId: string;
  quesName: string;
};

export default async function Page({ params }: { params: EditPageParams }) {
  const question = await databases.getDocument(
    db,
    questionCollection,
    params.quesId
  );

  return <EditQues question={question} />;
}
