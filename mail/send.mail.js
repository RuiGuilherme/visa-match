import { transporter } from "./nodemail.config.js"

// send email confirmation to user
export const sendConfirmationEmail = async (email, token) => {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Confirm your email",
        html: `<p>Please confirm your email by clicking <a href="${process.env.CLIENT_URL}/api/public/auth/email/${token}">here</a></p> or ${process.env.CLIENT_URL}/api/public/auth/email/${token} `
    }

    await transporter.sendMail(mailOptions)
}

// send email to change password
export const sendResetPasswordEmail = async (email, token) => {
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Reset your password",
        html: `<p>Please reset your password by clicking <a href="${process.env.CLIENT_URL}/api/public/auth/password/${token}">here</a></p>`
    }
    
    await transporter.sendMail(mailOptions)
}
