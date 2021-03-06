const express = require("express")
const { createUser } = require("../db/models/User")
const { getUserEmailPassword, getUser, deleteUser, alterInfo } = require("../queries/userQueries")
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

	res.send({ message: userInfo ? userInfo : null })
})
userRouter.post("/create-user", async (req, res) => {
	const user = await createUser(req.body)
	res.send({
		message: {
			user: user,
			error: !user ? "could not create account" : null,
		},
	})
})
userRouter.post("/validate", async (req, res) => {
	const { id, code } = req.body
	// sequelize returns in a json string, so it needs to be parsed multiple times
	const user = await getUser(id)
		.then(res => JSON.stringify(res, null, 2))
		.then(res => JSON.parse(res))
		.then(res => {
			return {
				code: res.code,
			}
		})

	let error
	if (!user) error = "user not found"

	alterInfo({
		userId: id,
		newInfo: {
			verified: true,
			code: null,
		},
	})
	// return user verified now
	res.send({ message: { error, user: user.code == code } })
})
userRouter.post("/update-user", async (req, res) => {
	const { newInfo } = req.body
	const updatedUser = await alterInfo({ userId: newInfo.id, newInfo })
	res.send({ message: updatedUser })
})
userRouter.post("/login", async (req, res) => {
	const { email = null, password = null, id = null } = req.body
	if (id) {
		const user = await getUser(id)
		res.send({ message: JSON.parse(user) })
	}
	if (email && password) {
		const user = await getUserEmailPassword(email, password)
		req.session.user = user.dataValues
		req.session.save()
		console.log(req.session.user)
		res.send({
			message: user,
		})
	}
})
userRouter.post("/delete", (req, res) => {
	const deletedUser = deleteUser(req.body.id)
	res.send({ message: "hello ther" })
})

module.exports = userRouter
