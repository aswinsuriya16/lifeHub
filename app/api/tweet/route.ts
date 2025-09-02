import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({
        msg : "unauthorized"
      });
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
        tweet: { id: tweet.id, description: tweet.description, userId: tweet.userId },
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