import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';

export const SendMail = async({email, emailType, userId}:any) => {
    try{

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {
                $set: {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}
            }
            );
        }else{
            await User.findByIdAndUpdate(userId, {
                $set: {forgetPasswordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 3600000}
            }
            );
        }

        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "2c0838ceab09c2",
                pass: "bcc67412a39fd4"
            }
        });

        const mailoptions = {
            from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reseet your password",
            html: `<p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`, 
        }

        const emailResponse = await transporter.sendMail(mailoptions);

        return emailResponse;
    }catch(error:any){
        throw new Error(error.message); 
    }
}