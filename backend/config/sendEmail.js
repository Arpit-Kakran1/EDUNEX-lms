import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});
 
const sendMail = async (to, otp) => { 
  const info = await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject: "Reset your password",
    html: `<p>Your OTP to reset your password is <b>${otp}</b>.
    Valid Only for five minutes`, // HTML version of the message
  }) 
  
}

export default sendMail;
