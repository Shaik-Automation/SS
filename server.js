const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sendMail", async (req, res) => {
  const { email, reason } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "", // ✅ your Gmail
        pass: "", // ✅ Google App Password (16-char)
      },
    });

    const mailOptions = {
      from: "StudySnap <>",
      to: "", // ✅ the receiver (your real Gmail)
      subject: "New StudySnap Interest",
      text: `New user interested!\n\nEmail: ${email}\nReason: ${reason}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Mail sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending mail" });
  }
});

app.listen(3000, () => console.log("Mailer server running on port 3000"));

