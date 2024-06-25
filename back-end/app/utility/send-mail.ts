import nodemailer from "nodemailer";

const sendMail = async (mail: any) => {
    try {
        const account = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: "francesco.hane87@ethereal.email",
                pass: "VBy5cydrEC5x7SU7VV",
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        await transporter.sendMail({
            from: mail.from,
            to: mail.to.join(","),
            subject: mail.subject,
            // text: "Hello world?",
            html: mail.text,
        });
    } catch (e) {
        throw e;
    }
};

export default {
    sendMail,
};
