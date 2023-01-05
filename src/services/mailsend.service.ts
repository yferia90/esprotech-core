import nodemailer from 'nodemailer';

import { ContactInterface } from "../types/contact.type";

const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_FROM_PASS = process.env.EMAIL_FROM_PASS;
const EMAIL_TO = process.env.EMAIL_TO;

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: EMAIL_FROM,
        pass: EMAIL_FROM_PASS,
    },
    secure: true,
});

const sendMailContactBusiness = (body: ContactInterface) => {
    console.log('PARAMETROS!!!!!!',{EMAIL_FROM, EMAIL_FROM_PASS, EMAIL_TO});
    const {email, mensaje} = body;
    const mailData = {
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: 'Nuevo contacto de cliente',
        text: mensaje,
        html: `<b>Responder al contacto ${email}<br/>`,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            console.log("error!!!",error);
            return false;
        }
        console.log("mail enviado con exito!!!");
        return true;
    });
}

export default sendMailContactBusiness;
