import nodemailer from 'nodemailer';

import { ContactInterface } from "../types/contact.type";

const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_FROM_PASS = process.env.EMAIL_FROM_PASS;
const EMAIL_TO = process.env.EMAIL_TO;

const sendMailContactBusiness = async (body: ContactInterface) => {
    const {email, message} = body;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: EMAIL_FROM, // generated ethereal user
          pass: EMAIL_FROM_PASS, // generated ethereal password
        }
    });

    const mailData = {
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: 'Nuevo contacto de cliente',
        html: `Mensaje del cliente: ${message} </br> <b>Responder al contacto ${email}<br/>`,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return false;
        }
        return true;
    });
}

export default sendMailContactBusiness;
