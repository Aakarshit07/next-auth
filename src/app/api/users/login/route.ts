import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


connect();


export async function PORT(request: NextRequest) {
    try {
        const reqBody = await request.json(); //here we using await because in nextjs we use await on request beacuse reaquest is a promise but in express these are handled behind the seens
        const { email, password} = reqBody
        // validation
        console.log(reqBody);

        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({error: 'User does not exists'}, {status: 400});
        }
        console.log("User exists");

        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword) return NextResponse.json({error: 'Check Credentials'}, {status: 400});

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        const response = NextResponse.json({
            message: "Login Successful",
            success: true,
        })
        
        response.cookies.set('token', token, {
            httpOnly: true,
        })

        return response

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}