const { sequelize } = require("../index")
const { DataTypes } = require("sequelize")
const { hashPassword } = require("../../utils/hashing")
const { Product, createProduct } = require("./Product")

const User = sequelize.define(
	"User",
	{
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: null,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		age: {
			type: DataTypes.NUMBER,
			allowNull: true,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
		tableName: "users",
		modelName: "User",
	}
)
/**

 * @param {String} firstName Users firstname
 * @param {string} lastName Users lastname
 * @param	{string} password - raw users password
 * @param {string} email - users email
 * @param {Int} Age - users age
 * @returns Instance of User
 */
const createUser = async ({ firstName, lastName, password, email, age }) => {
	let newUser

	try {
		newUser = await User.create(
			{
				firstName,
				lastName,
				password: await hashPassword(password),
				email,
				age,
			},
			{ fields: ["firstName", "lastName", "password", "email", "age"] }
		)
	} catch (err) {
		// console.log(err)
	}
	return newUser
}
// createUser({
// 	firstName: "rodrigo",
// 	lastName: "scola",
// 	password: "1212roro",
// 	email: "handomizando@gmail.com",
// 	age: 12,
// }).then(res => {
// 	console.log(res)
// })

module.exports = { User, createUser }
