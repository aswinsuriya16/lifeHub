import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
    }

    const { description } = await req.json();

    if (!description?.trim()) {
      return NextResponse.json(
        { message: "Tweet description is required" },
        { status: 400 }
      );
    }

    const tweet = await prismaClient.tweet.create({
      data: {
        description,
        userId: session.user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Tweet added successfully",
        tweet: {
          id: tweet.id,
          description: tweet.description,
          user: session.user.username,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating tweet:", error);
    return NextResponse.json(
      { message: "Error pushing to the database!" },
    );
  }
}

export async function GET() {
  try {
    const tweets = await prismaClient.tweet.findMany({
      orderBy: {
        upvotes : {
          _count : "desc"
        }
      },
      include: { upvotes: true, downvotes: true, user : true }, 
    });

    const formatted = tweets.map((t) => ({
      id: t.id,
      description: t.description,
      author: t.user.username,
      authorId: t.userId,
      createdAt: t.createdAt.toISOString(),
      score: t.upvotes.length - t.downvotes.length,
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error("Error fetching tweets:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await req.json();
    const tweetId = Number(postId);

    if (!Number.isInteger(tweetId) || tweetId <= 0) {
      return NextResponse.json({ message: "Invalid tweet id" }, { status: 400 });
    }

    const tweet = await prismaClient.tweet.findUnique({
      where: { id: tweetId },
      select: { userId: true },
    });

    if (!tweet) {
      return NextResponse.json({ message: "Tweet not found" }, { status: 404 });
    }

    if (tweet.userId !== session.user.id) {
      return NextResponse.json(
        { message: "Only the tweet author can delete this tweet" },
        { status: 403 }
      );
    }

    await prismaClient.$transaction([
      prismaClient.upvote.deleteMany({ where: { tweetId } }),
      prismaClient.downvote.deleteMany({ where: { tweetId } }),
      prismaClient.tweet.delete({ where: { id: tweetId } }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error deleting tweet:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
