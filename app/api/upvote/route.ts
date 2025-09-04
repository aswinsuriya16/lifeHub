import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prismaClient } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { tweetId } = await req.json();
  if (!tweetId) {
    return NextResponse.json({ error: "No tweetId provided" }, { status: 400 });
  }

  const userId = Number(session.user.id);

  try {
    const existingUpvote = await prismaClient.upvote.findUnique({
      where: {
        userId_tweetId: {
          userId,
          tweetId,
        },
      },
    });

    if (existingUpvote) {
      await prismaClient.upvote.delete({
        where: { userId_tweetId: { userId, tweetId } },
      });

      return NextResponse.json({ message: "Upvote removed" });
    }
    await prismaClient.downvote.deleteMany({
      where: { userId, tweetId },
    });

    await prismaClient.upvote.create({
      data: { userId, tweetId },
    });

    return NextResponse.json({ message: "Upvoted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to toggle upvote" }, { status: 500 });
  }
}
