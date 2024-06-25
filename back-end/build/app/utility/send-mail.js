"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = (mail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield nodemailer_1.default.createTestAccount();
        let transporter = nodemailer_1.default.createTransport({
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
        yield transporter.sendMail({
            from: mail.from,
            to: mail.to.join(","),
            subject: mail.subject,
            // text: "Hello world?",
            html: mail.text,
        });
    }
    catch (e) {
        throw e;
    }
});
exports.default = {
    sendMail,
};
