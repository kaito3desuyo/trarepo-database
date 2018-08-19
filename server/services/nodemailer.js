import nodemailer from "nodemailer"
require("dotenv").config()

const setting = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_ACCOUNT_USER,
        pass: process.env.SMTP_ACCOUNT_PASS
    }
}

export default {
    send: (from, to, subject, text, callback) => {
        const smtp = nodemailer.createTransport(setting)
        const msg = {
            from,
            to,
            subject,
            html: text
        }
        smtp.sendMail(msg, (error, info) => {
            if (error) {
                console.error(error)
                callback(error)
            } else {
                console.log("Send Successful")
                callback(null, "Send Successful")
            }
        })
    }
}
