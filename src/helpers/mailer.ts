import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from 'bcryptjs';
export const sendEmail = async({email, emailType, userId}:any) => {
  try {

    const hashedToken = await bcrypt.hash(userId.toString(), 10);   

    if(emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, 
        {
          verifyToken: hashedToken, 
          verifyTokenExpiry:Date.now() + 3600000
        }
      );
    } else if(emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, 
        {
          forgotPasswordToken: hashedToken, 
          forgotPasswordExpiry:Date.now() + 3600000
        }
      );
    }
    
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525, // true for port 465, false for other ports
      auth: {
        user: "d03c0bacaac592",
        pass: "a5dba82c4020e1"
      }
    });

    const mailOptions = {
      from: 'maddison53@ethereal.email', 
      to: email,
      subject: emailType === 'VERIFY' ? "Verify yout email" : 'Reset your password',
      emaiil : "Reset your password",
      html: `<p>Click <a href="">here</a> to ${emailType === 'VERIFY' ? 'Vrify your email' : 'reset your password'} your password.
       or copy and paste the link below in your browser.
       <br />
      </p>`,
    } 

    const mailResponse =  await transporter.sendEmail(mailOptions)

    return mailResponse;
  } catch (error:any) {
    throw new Error(error.message);
  }
}