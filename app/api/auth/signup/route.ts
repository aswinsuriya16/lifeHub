import { NextRequest, NextResponse } from "next/server";
import {prismaClient} from "../../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req : NextRequest) {
    const {email,username,password} = await req.json();
        if(!username || !email || !password) {
            return NextResponse.json({
                msg : "Missing fields"
            })
        }
        const existingUser = await prismaClient.user.findUnique({
            where : {
                username : username
            }
        })
        if(existingUser) {
            return NextResponse.json({
                msg : "User Already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);
        try {
            await prismaClient.user.create({
                data :{
                    username,password:hashedPassword,email
                }
            })
            return NextResponse.json({
                msg: "SignUp successful !"
            })
        }
        catch(e) {
            return NextResponse.json({
                msg :"Error pushing to DB",e
            })
        }
}