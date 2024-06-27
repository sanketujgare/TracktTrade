import nodemailer from "nodemailer";

const sendMail = async (mail: any) => {
    try {
        const account = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        await transporter.sendMail({
            from: mail.from,
            to: mail.to.join(","),
            subject: mail.subject,
            html: mail.text,
        });
    } catch (e) {
        throw e;
    }
};

export default {
    sendMail,
};
