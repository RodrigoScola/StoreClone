const { sequelize } = require("../index")
const { DataTypes } = require("sequelize")
const Product = sequelize.define(
	"Product",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
		},
		filename: {
			type: DataTypes.STRING,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		badges: {
			type: DataTypes.ARRAY(DataTypes.STRING),
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: false,
		freezeTableName: true,
		tableName: "products",
		modelName: "Product",
	}
)

/**
 *	creates the user in the databse and in stripe
 * @param {string} filename - name of the image thats going to be saved in firebase
 * @param {string} name - name of the product
 * @param {string} description - description of the product
 * @param {int} price - price of the product
 * @param {UUID} userId - the id of the user
 * @param {Array} badges - the badges of the product
 * @param {string} category - the category of the product
 * @param {int} quantity - number of items of the product
 * @returns an object of user in sequelize
 * @async
 */
const createProduct = async ({ filename, name, description, price, userId, badges, category, quantity }) => {
	let newUser
	try {
		newUser = await Product.create({
			name,
			description,
			price,
			userId,
			badges,
			category,
			filename,
			quantity,
		})
		console.log(newUser.dataValues)
	} catch (err) {
		// console.log(err)
	}
	return newUser.dataValues
}

module.exports = { Product, createProduct }
