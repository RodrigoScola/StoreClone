const { sequelize } = require("../index")
const { DataTypes, Sequelize } = require("sequelize")

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
module.exports = User
