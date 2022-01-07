const express = require("express")
const { createUser } = require("../db/models/User")
const { getAllUsers, getUserEmailPassword } = require("../queries/userQueries")
const userRouter = express.Router()

userRouter.post("/create-user", async (req, res) => {
	const { firstName, lastName, password, email, age } = req.body
	console.log(req.body)

	const user = await createUser({
		firstName,
		lastName,
		password,
		email,
		age,
	})
	res.send({
		message: "user created",
		user: user,
	})
})
userRouter.post("/login", async (req, res) => {
	const { email, password } = req.body
	const user = await getUserEmailPassword(email, password)
	console.log(user)
	res.send({
		message: "asds",
	})
})

module.exports = userRouter
