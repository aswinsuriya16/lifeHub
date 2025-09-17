import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({
        msg : "unauthorized"
      });
    }
    console.log("Before tweet desc");

    const { description } = await req.json();
    if (!description?.trim()) {
      return NextResponse.json(
        { message: "Tweet description is required" },
        { status: 400 }
      );
    }
    console.log("After the tweed desc")
    console.log(session);
    const tweet = await prismaClient.tweet.create({
      data: {
        description,
        email: session.user.email
      },
    });
    console.log("check ...... ")
    return NextResponse.json(
      {
        message: "Tweet added successfully",
        tweet: { id: tweet.id, description: tweet.description, user : tweet.email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating tweet:", error);
    return NextResponse.json(
      { message: "Internal server error" },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const tweets = await prismaClient.tweet.findMany({
      orderBy: { id: "desc" },
      include: { upvotes: true, downvotes: true }, // include for score
    });

    const formatted = tweets.map((t) => ({
      id: t.id.toString(),
      content: t.description,
      author: t.email.split("@")[0],
      createdAt: t.createdAt.toISOString(),
      score: (t.upvotes.length ?? 0) - (t.downvotes.length ?? 0),
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error("Error fetching tweets:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
