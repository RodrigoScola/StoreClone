const express = require("express")
const server = express()
const session = require("express-session")
const bodyParser = require("body-parser")
const store = session.MemoryStore()
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const { sequelizeSetup } = require("./db")
const compression = require("compression")
const User = require("./db/models/User")
// const User = require("./db/models/User")

require("dotenv").config()
// add origin header(only when frontend posted)
server.use(
	cors({
		origin: process.env.__prod__ ? "https://www.example.com/" : "*", // if __prod__ is false, will only accept requests from this website
	})
)
server.use(compression())
// parses the information
server.use(bodyParser.json())

// enabling sessions & session storage
server.use(
	session({
		secret: "voirut35arkt", // add a real secret
		resave: false,
		saveUninitialized: false,
		store: store,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
			secure: true,
			sameSite: "none",
		},
	})
)

// limits how much information is sent
const limiter = rateLimit({
	windowMs: 1000 * 60 * 5, // 5 minutes
	max: 100,
})
server.use("/", async (req, res, next) => {
	try {
		await User.create({
			firstName: "hane",
			lastName: "hahah",
			email: "jane@gmail.com",
			age: 12,
		})
	} catch (err) {
		console.log(err.message)
	}
	res.send("ahaha")
})

server.use(limiter)
server.listen(process.env.PORT, async () => {
	sequelizeSetup()
	console.log(`server is listening on port ${process.env.port} \n  http://localhost:${process.env.PORT}/`)
})
