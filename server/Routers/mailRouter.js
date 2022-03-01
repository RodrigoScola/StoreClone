const express = require("express")
const { getUser } = require("../queries/userQueries")
const { sendMail } = require("../utils/mail")
const mailRouter = express.Router()

mailRouter.use("/validate-email", async (req, res) => {
	const { id } = req.body
	const user = await getUser(id)
		.then(res => JSON.stringify(res, null, 2))
		.then(res => JSON.parse(res))
		.then(({ id, email, code, firstName }) => {
			return {
				id,
				email,
				firstName,
				code,
			}
		})

	if (user.code == null) {
		res.send({ message: { user: true } })
	}
	const mail = await sendMail({
		subject: "Verification Account",
		to: user.email,
		html: `<div><h1>Verify your account</h1>
          <p>hello there ${user.firstName}! thanks for joining our platform, we will need to verify that it is really you,
          please say this code in the validation of your account</p>
          <h3>${user.code}</h3>
          </div>`,
	})
})
mailRouter.use("/purchase", async (req, res) => {
	// console.log(req.body)
	const { userInfo, product } = req.body
	const { country, zipCode, city } = await getUser(userInfo.userId)
	const { email, firstName, lastName } = await getUser(product.userId)

	const mail = await sendMail({
		subject: "SOMEONE BOUGHT YOR FING",
		to: email,
		text: `hello ${firstName} ${lastName}, the ${product.name} just sold! now please send the package to the address: 
		to the country ${country}, in the city of ${city} in the zip code of ${zipCode}`,
	}).then(() => {
		res.send({ message: "email sent" }).status(200)
	})
})

module.exports = mailRouter
