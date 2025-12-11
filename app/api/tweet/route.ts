import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (!session || !session.user?.id) {
      return NextResponse.json({
        msg : "unauthorized"
      });
    }
    console.log("Before tweet desc");

    const { description } = await req.json();
    
    if (!description?.trim()) {
      return NextResponse.json(
        { message: "Tweet description is required" },
      );
    }
    console.log("After the tweed desc")
    console.log(session);
    const tweet = await prismaClient.tweet.create({
      data: {
        description,
        userId: session.user.id
      },
    });
    console.log("check ...... ")
    return NextResponse.json(
      {
        message: "Tweet added successfully",
        tweet: { id: tweet.id, description: tweet.description, user : session.user.username},
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

export async function GET(req: NextRequest) {
  try {
    const tweets = await prismaClient.tweet.findMany({
      orderBy: {
        upvotes : {
          _count : "desc"
        }
      },
      include: { upvotes: true , user : true}, 
    });

    const formatted = tweets.map((t) => ({
      id: t.id.toString(),
      description: t.description,
      author: t.user.username,
      createdAt: t.createdAt.toISOString(),
      score: t.upvotes.length
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (err) {
    console.error("Error fetching tweets:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
