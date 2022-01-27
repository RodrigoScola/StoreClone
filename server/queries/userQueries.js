const { User } = require("../db/models/User")
const { validatePassword } = require("../utils/hashing")

/**
 * @description gets all users in database
 * @returns information about all users
 */
const getAllUsers = async () => {
	const users = await User.findAll()
	return await JSON.stringify(users, null, 2)
}
/**
 * @description gets user in the database by the id
 * @param {String} uuid - String
 * @returns User
 * @async
 */
// get user by uuid
const getUser = async uuid => {
	try {
		const user = await User.findOne({
			where: {
				id: uuid,
			},
		})
		const userInfo = user
		console.log(userInfo)
		return userInfo
	} catch (err) {
		console.log("")
	}
}

/**
 * @function
 * @async
 * @param {String} email
 * @param {String} password
 * @returns
 */
const getUserEmailPassword = async (email, password) => {
	if (email == null) {
		return {}
	}
	let user
	let errors
	try {
		user = await User.findOne({
			where: {
				email: email,
			},
		})
		const hashedPassword = user.dataValues.password
		if (validatePassword(password, hashedPassword)) {
			return user
		}
	} catch (err) {
		errors.push(err.message)
	}
	return {
		user: user,
		error: { errors },
	}
}

module.exports = {
	getAllUsers,
	getUser,
	getUserEmailPassword,
}
