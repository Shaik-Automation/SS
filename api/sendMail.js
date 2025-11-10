// api/sendMail.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { email, reason } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `StudySnap <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: "New StudySnap Interest",
      text: `New user interested!\n\nEmail: ${email}\nReason: ${reason}`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Mail sent successfully ✅" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error sending mail ❌" });
  }
}
