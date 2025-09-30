import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';
import { v4 as uuidv4 } from 'uuid';

export const SendMail = async({email, emailType, userId}:any) => {
    try{
        const hashedToken = await uuidv4();

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

        const site  = `<!doctype html>
                    <html lang="en">
                    <head>
                    <meta charset="utf-8">
                    <title>Verify your email</title>
                    <meta name="viewport" content="width=device-width,initial-scale=1">
                    <style>
                        body,table,td,a{ -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
                        table,td{ mso-table-lspace:0pt; mso-table-rspace:0pt; }
                        img{ -ms-interpolation-mode:bicubic; }
                        img{ border:0; height:auto; line-height:100%; outline:none; text-decoration:none; }
                        table{ border-collapse:collapse !important; }
                        body{ margin:0 !important; padding:0 !important; width:100% !important; }
                        @media screen and (max-width:600px){
                        .email-container{ width:100% !important; }
                        .fluid{ width:100% !important; max-width:100% !important; height:auto !important; }
                        .stack-column, .stack-column-center{ display:block !important; width:100% !important; max-width:100% !important; direction:ltr !important; }
                        .stack-column-center{ text-align:center !important; }
                        }
                        .btn {
                        display:inline-block;
                        padding:14px 24px;
                        font-size:16px;
                        color:#ffffff !important;
                        text-decoration:none;
                        border-radius:6px;
                        background-color:#1a73e8;
                        border:1px solid #1760c6;
                        font-weight:600;
                        }
                    </style>
                    </head>
                    <body style="background-color:#f2f4f6; margin:0; padding:0;">

                    <div style="display:none; max-height:0px; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:#ffffff; opacity:0;">
                        Verify your email address to finish setting up your account.
                    </div>

                    <table role="presentation" aria-hidden="true" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                        <td align="center" style="padding:20px 10px;">
                            <table role="presentation" class="email-container" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:8px; overflow:hidden;">
                            <tr>
                                <td style="padding:28px 32px; text-align:left; font-family:Arial, sans-serif;">
                                <h1 style="margin:0; font-size:20px; color:#111111;">Welcome, {{user_name}} 👋</h1>
                                <p style="margin:8px 0 0; color:#666666; font-size:14px;">Thanks for creating an account. Please verify your email address to get started.</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:32px; font-family:Arial, sans-serif; color:#333333; font-size:16px; line-height:1.5;">
                                <p style="margin:0 0 16px;">Tap the button below to verify your email address. This link will expire in <strong>24 hours</strong>.</p>
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:20px 0;">
                                    <tr>
                                    <td align="center">
                                        <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" class="btn" target="_blank" rel="noopener noreferrer">Verify Email</a>
                                    </td>
                                    </tr>
                                </table>
                                <p style="margin:16px 0 0; color:#666666; font-size:13px;">
                                    If the button doesn't work, copy and paste the following link into your browser:
                                    <br>
                                    <a href="{{verification_url}}" style="color:#1a73e8; word-break:break-all;">{{verification_url}}</a>
                                </p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:24px 32px; background-color:#fafafa; text-align:left; font-family:Arial, sans-serif; font-size:13px; color:#777777;">
                                <p style="margin:0 0 6px;">Need help? Reply to this email or contact our support team.</p>
                                <p style="margin:6px 0 0;">If you didn't create an account, you can safely ignore this email.</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:16px 32px; text-align:center; font-family:Arial, sans-serif; font-size:12px; color:#999999;">
                                © {{year}} Your Company — 1234 Street, City, Country
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    </body>
                    </html>
                    `

        const mailoptions = {
            from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: site, 
        }

        const emailResponse = await transporter.sendMail(mailoptions);

        return emailResponse;
    }catch(error:any){
        throw new Error(error.message); 
    }
}