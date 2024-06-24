import nodemailer from "nodemailer";

const sendMail = async () => {
    try {
        const sender = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: "maddison53@ethereal.email",
                pass: "jn7jnAPss4f63QBp6D",
            },
        });
        const info = await transporter.sendMail({
            from: '"Hey hey its just test mail 👻" <maddison53@ethereal.email>',
            to: "yuvrajxt@gmail.com",
            subject: "Test Email ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });
    } catch (e) {
        throw e;
    }
};

export default {
    sendMail,
};
