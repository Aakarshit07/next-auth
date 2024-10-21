import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}: any) => {
  try {

    const hashedToken = await bcrypt.hash(userId.toString(), 10);   
    console.log(emailType);
    if(emailType === 'VERIFY') {
     console.log("IF Veryfy: ",emailType);

      await User.findByIdAndUpdate(userId, { 
        $set:  {
          verifyToken: hashedToken, 
          verifyTokenExpiry:Date.now() + 3600000
        }
      });
    } else if(emailType === 'RESET') {
     console.log("IF Reset: ",emailType);

      await User.findByIdAndUpdate(userId,  {
        $set: {
          forgotPasswordToken: hashedToken, 
          forgotPasswordExpiry:Date.now() + 3600000
        }
      });
    }

    console.log("Out of if else: ***");

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525, // true for port 465, false for other ports
      auth: {
        user: "d03c0bacaac592", // ❌ should come from .env 
        pass: "a5dba82c4020e1" // ❌ should come from .env
      }
    });

    const mailOptions = {
      from: 'maddison53@ethereal.email', 
      to: email,
      subject: emailType === 'VERIFY' ? "Verify yout email" : 'Reset your password',
      emaiil : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
        ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'} 
       or copy and paste the link below in your browser.
       <br>
       ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    } 

    const mailResponse =  await transporter.sendMail(mailOptions)
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
} 