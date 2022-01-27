const bcrypt = require("bcryptjs")

/**
 *
 * @param {string} password
 * @returns {string} hashed password
 */
const hashPassword = async password => {
	const hashed = await bcrypt.hash(password, 10)
	return hashed
}
/**
 * @async
 * @function validatePassword
 * @param {String} userPassword
 * @param {String} hashedPassword
 * @returns Boolean
 */
const validatePassword = async (userPassword, hashedPassword) => {
	try {
		return await bcrypt.compare(userPassword, hashedPassword)
	} catch (err) {}
}

module.exports = { hashPassword, validatePassword }
