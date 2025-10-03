import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prismaClient } from "@/lib/prisma";
import { useSession } from "next-auth/react";

export async function POST(req: NextRequest) {
  const session = useSession();
  console.log(session);
  
}
