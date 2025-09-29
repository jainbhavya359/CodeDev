import { connect } from '@/dbConfig/dbCofig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { SendMail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        console.log(username + " " + email + " " + password);
        
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: "User already Exists"}, {status: 400});
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        const newUser  = new User({
            user: username,
            email: email,
            password: hashedPassword,
        });
        
        const savedUser = await newUser.save();
        console.log(savedUser);

        await SendMail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User Registered Successfully",
            success: true,
            savedUser
        })
    }catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}