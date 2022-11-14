import nodemailer from 'nodemailer'

// creat a nodemailer transporter
export const transporter = nodemailer.createTransport({
	  host: process.env.MAIL_HOST,
	  port: process.env.MAIL_PORT,
	  secure: process.env.MAIL_PORT == 465 ? true : false,
	  auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	  }
})
