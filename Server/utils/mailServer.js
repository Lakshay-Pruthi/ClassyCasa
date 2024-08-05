import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "classycasa.furniture@gmail.com",
    pass: process.env.MAIL_PASS_KEY,
  },
});

const sendMail = async (info) => {
  try {
    await transporter.sendMail(info);
    console.log("Mail sent successfully ✔");
  } catch (err) {
    console.log(err);
  }
};

export default sendMail;
