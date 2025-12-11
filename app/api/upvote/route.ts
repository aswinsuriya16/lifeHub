import { authOptions } from "../auth/[...nextauth]/route";
import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await req.json();
    const tweetId = Number(postId);

    await prismaClient.upvote.upsert({
      where: {
        userId_tweetId: {
          userId: session.user.id,
          tweetId,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        tweetId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error upvoting:", err);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
