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
 *
 * @param {String} userPassword
 * @param {String} hashedPassword
 * @returns Boolean
 */
const validatePassword = async (userPassword, hashedPassword) => {
	const isMatch = await bcrypt.compare(userPassword, hashedPassword)
	return isMatch
}

module.exports = { hashPassword, validatePassword }
