import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req : NextRequest) {
    const session = await getServerSession();
    const {tweetId} = await req.json();
    const prismaClient = new PrismaClient();
    console.log(session);
    if(!session) {
        return NextResponse.json({
            msg : "Unauthorized !"
        })
    }
    try {
        await prismaClient.downvote.upsert({
      where: {
        userId_tweetId: {
          userId: Number(session.user.id),
          tweetId: Number(tweetId),
        },
      },
      update: {},
      create: {
        userId: Number(session.user.id),
        tweetId: Number(tweetId),
      },
    });
    }
    catch(e) {
        return NextResponse.json({
            msg : "Failed to downvote !"
        })
    }

}