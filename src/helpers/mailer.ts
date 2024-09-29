import nodemailer from "nodemailer";

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        //Todo: configure mail for usage
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 444,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });


          const mailOptions = {
            from: 'maddison53@ethereal.email', 
            to: email,
            subject: emailType === 'VERIFY' ? "Verify yout email" : 'Reset your password',
            html: "<b>Hello world?</b>",
          } 

        const mailResponse =  await transporter.sendEmail(mailOptions)

        return mailResponse;
    } catch (error:any) {
        throw new Error(error.message);
    }
}