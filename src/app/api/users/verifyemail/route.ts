import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel";
import { NextResponse, NextRequest } from 'next/server'


connect();

export async function PORT(request: NextRequest) {
    try {
        
        const reqBody = await request.json(); //here we using await because in nextjs we use await on request beacuse reaquest is a promise but in express these are handled behind the seens
        const { token } = reqBody;
        console.log(token);

        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}}); // $gt means ki abhi purane time pe jo hamne token bheja tha us time per to abhi ka time greater hoga uske time se
                
        if(!user) return NextResponse.json({error: "Invalid token"}, {status: 400})
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "Email verified successfully", 
            success: true
        }, {status: 200})



    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}