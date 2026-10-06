import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export async function sendEmail(to, subject, html) {
    await transporter.sendMail({
        from: `"NGL-APP"<${process.env.EMAIL}>`,
        to: to,
        subject: subject,
        html: html,
    });
}
