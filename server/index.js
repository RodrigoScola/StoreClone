const express = require("express")
const server = express()
const session = require("express-session")
const bodyParser = require("body-parser")
const PORT = 4001
const store = session.MemoryStore()
const cors = require("cors")
const rateLimit = require("express-rate-limit")

// add origin header(only when frontend posted)
server.use(cors())
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
server.use("/", (req, res) => {
	console.log(req.session)
})
// limits how much information is sent
const limiter = rateLimit({
	windowMs: 1000 * 60 * 5, // 5 minutes
	max: 100,
})
server.use(limiter)
server.listen(PORT, () => {
	console.log(`server is listening on port ${PORT}`)
})
