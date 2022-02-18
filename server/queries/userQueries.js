const { User } = require("../db/models/User")
const { validatePassword } = require("../utils/hashing")
const { Product } = require("../db/models/Product")
const { deleteProductByUserId, deleteProduct } = require("./ProductQueries")
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
		return user.dataValues
	} catch (err) {
		console.log("")
	}
}

const alterInfo = async ({ userId, newInfo }) => {
	const updatedUser = await User.update(newInfo, {
		where: {
			id: userId,
		},
	})
	return updatedUser == 1 ? true : false
}
getUser("c3fd1f06-822e-4f78-b254-bee38f0f3fcf").then(res => {
	console.log(res)
})
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
		// errors.push(err.message)
	}
	return {
		user: user,
		error: { errors },
	}
}
/**
 * deletes the user and all the products that it had
 * @param {uuid} usersId
 * @returns {boolean}
 */
const deleteUser = async id => {
	const deletedUser = await User.destroy({
		where: {
			id,
		},
	})
	deleteProduct({ userId: id })
	return deletedUser == 1 && deleteProductByUserId == true ? true : false
}
module.exports = {
	getAllUsers,
	getUser,
	getUserEmailPassword,
	alterInfo,
	deleteUser,
}
