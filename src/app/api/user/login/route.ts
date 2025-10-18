import { connect } from '@/dbConfig/dbCofig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import { useUserStore } from '@/store/useCodeEditorStore';

connect();      

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error: "User not registered"}, {status: 400});
        }

        const passwordValid = await bcryptjs.compare(password, user.password);

        if(!passwordValid){
            return NextResponse.json({error: "Check your Credentials"}, {status: 400});
        }

        const tokenData = {
            id: user._id,
            username: user.user,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

        const response = NextResponse.json({
            messsage: "Logged In Successfully",
            success: true
        });

        response.cookies.set("token", token, {
            httpOnly: true  
        });

        return response;
    }catch(error: any){
        return NextResponse.json({error: error}, {status: 500});
    }
}