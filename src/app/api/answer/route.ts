import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(request: NextRequest) {
  try {
    const { questionId, answer, authorId } = await request.json();

    const response = await databases.createDocument(
      db,
      answerCollection,
      ID.unique(),
      {
        content: answer,
        authorId: authorId,
        questionId: questionId,
      }
    );

    const prefs = await users.getPrefs<UserPrefs>(authorId);
    await users.updatePrefs(authorId, {
      reputation: Number(prefs.reputation) + 1,
    });

    return NextResponse.json(response, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message || "An error occurred.",
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "An unknown error occurred.",
        },
        { status: 500 }
      );
    }
  }
}

export async function DELETE(request: NextRequest) {
  //++//

  try {
    const { answerId, authorId } = await request.json();

    const response = await databases.deleteDocument(
      db,
      answerCollection,
      answerId
    );

    const prefs = await users.getPrefs<UserPrefs>(authorId);
    await users.updatePrefs(authorId, {
      reputation: Number(prefs.reputation) - 1,
    });

    return NextResponse.json(response, { status: 200 });

    //++//
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message || "An error occurred.",
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "An unknown error occurred.",
        },
        { status: 500 }
      );
    }
  }
}
