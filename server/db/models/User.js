const { sequelize } = require("../index")
const { DataTypes } = require("sequelize")
const { hashPassword } = require("../../utils/hashing")

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
			// unique: true,
		},
		age: {
			type: DataTypes.NUMBER,
			allowNull: true,
		},
		city: {
			type: DataTypes.STRING,
		},
		country: {
			type: DataTypes.STRING,
		},
		zipCode: {
			type: DataTypes.STRING,
		},
		billingAddress: {
			type: DataTypes.STRING,
		},
		verified: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		code: {
			type: DataTypes.INTEGER,
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
const createUser = async ({ city, billingAddress, country, zipCode, firstName, lastName, password, email, age }) => {
	let newUser

	try {
		newUser = await User.create(
			{
				firstName,
				lastName,
				password: await hashPassword(password),
				email,
				age,
				city,
				country,
				zipCode,
				billingAddress,
				code: Math.round(Math.random() * (9999 - 1000)) + 1000, //generates an 4 digit int
			},
			{
				fields: [
					"firstName",
					"lastName",
					"password",
					"email",
					"age",
					"city",
					"country",
					"zipCode",
					"billingAdress",
					"code",
					"verified",
				],
			}
		)
	} catch (err) {
		console.log(err)
	}
	return newUser
}
// createUser({
// 	firstName: "rodrigo",
// 	lastName: "scola",
// 	password: "1212roro",
// 	email: "handomizento@gmail.com",
// 	age: 12,
// 	city: "caxiasDoSul",
// 	country: "brazil",
// 	zipCode: "129380192",
// 	billingAddress: "aosidfu",
// }).then(res => {
// 	console.log(res, "this sis a")
// })

module.exports = { User, createUser }
