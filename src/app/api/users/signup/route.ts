import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextResponse, NextRequest } from 'next/server'
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json(); //here we using await because in nextjs we use await on request beacuse reaquest is a promise but in express these are handled behind the seens
        const {username, email, password} = reqBody
        // validation
        console.log(reqBody);

        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error: 'user already exists'}, {status: 400});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);
        
        
        //Send verification email
        await sendEmail({
            email, 
            eamilType: "VERIFY",
            userId: savedUser._id
        })

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}