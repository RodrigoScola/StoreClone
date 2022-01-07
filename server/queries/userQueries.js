const { User } = require("../db/models/User")
const { hashPassword } = require("../utils/hashing")

// get all users
const getAllUsers = async () => {
	const users = await User.findAll()
	return await JSON.stringify(users, null, 2)
}

/**
 *
 * @param {String} uuid
 * @returns User object
 */
// get user by uuid
const getUser = async uuid => {
	try {
		const user = await User.findOne({
			where: {
				id: uuid,
			},
		})
		return await JSON.stringify(user, null, 2)
	} catch (err) {
		console.log("")
	}
}
/**
 * @function
 * @async
 * @param {String} email - Required
 * @param {*} password
 * @returns
 */
const getUserEmailPassword = async (email, password) => {
	if (email == null || password == null) {
		return {}
	}
	password = hashPassword(password)
	let user
	let errors
	try {
		user = await User.findOne({
			where: {
				email: email,
				password: password,
			},
		})
	} catch (err) {
		errors.push(err.message)
	}
	return {
		user: await JSON.stringify(user, null, 2),
		error: { errors },
	}
}
module.exports = {
	getAllUsers,
	getUser,
	getUserEmailPassword,
}
