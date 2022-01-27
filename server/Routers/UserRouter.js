const express = require("express")
const { createUser } = require("../db/models/User")
const { getUserEmailPassword, getUser } = require("../queries/userQueries")
const userRouter = express.Router()

userRouter.get("/", async (req, res) => {
	var user
	try {
		user = await getAllUsers()
	} catch (err) {}
	res.send({
		message: user,
	})
})
userRouter.use("/get-user", async (req, res) => {
	const { id } = req.body
	const userInfo = await getUser(id)

	res.send({ message: userInfo })
})
userRouter.post("/create-user", async (req, res) => {
	const { firstName, lastName, password, email, age } = req.body
	// console.log(req.body)
	const user = await createUser({
		firstName,
		lastName,
		password,
		email,
		age,
	})
	console.log(user)
	res.send({
		message: {
			user: user,
			error: !user ? "could not create account" : null,
		},
	})
})
userRouter.post("/login", async (req, res) => {
	// console.log(req.body)

	const { email = null, password = null, id = null } = req.body
	if (id) {
		const user = await getUser(id)
		res.send({ message: JSON.parse(user) })
	}
	if (email && password) {
		const user = await getUserEmailPassword(email, password)
		// console.log(user)
		res.send({
			message: user,
		})
	}
})

module.exports = userRouter
