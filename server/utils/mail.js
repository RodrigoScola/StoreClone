require("dotenv").config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	auth: {
		user: process.env.EMAIL_EMAIL,
		pass: process.env.EMAIL_PASSWORD,
	},
	secure: false,
	tls: {
		rejectUnauthorized: false,
	},
})
/**
 *
 * @param {string} email
 * @param {subject} - what the email is about
 * @param {JSX} - doesnt do that well tho
 * @param {string} text
 * @returns {object} mail object
 */
const sendMail = async ({ to, subject, html = null, text = null }) => {
	const mailSent = await transporter.sendMail({
		to,
		from: process.env.EMAIL_EMAIL,
		subject,
		text,
		html,
	})
	return mailSent
}

module.exports = { sendMail }
