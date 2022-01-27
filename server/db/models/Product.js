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
			type: DataTypes.ARRAY(DataTypes.STRING),
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

const createProduct = async ({ filename, name, description, price, photos, userId, badges, category }) => {
	let newUser
	try {
		newUser = await Product.create({
			name,
			description,
			price,
			photos,
			userId,
			badges,
			category,
			filename,
		})
		console.log(newUser.dataValues)
	} catch (err) {
		// console.log(err)
	}
	return newUser.dataValues
}
createProduct({
	userId: "64051473-11d4-49ef-85ba-af10a7516b24",
	description: "yeah i used to uses a shampoo tht made me go bald 4head",
	price: 12,
	name: "hellla cool",
	photos: ["thing1", "thing2"],
	badges: ["thing3", "thing4"],
	category: ["a"],
	filename: "aosdijfoijasidojf",
})
module.exports = { Product, createProduct }
