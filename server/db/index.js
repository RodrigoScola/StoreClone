const { Sequelize } = require("sequelize")
require("dotenv").config()
const sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},

	define: {
		freezeTableName: true,
		createdAt: "createdat",
		updatedAt: "updatedat",
	},
})

const sequelizeSetup = async () => {
	try {
		sequelize.authenticate()

		console.log("connection with database successfull")
	} catch (err) {
		throw new Error("Cannot establish an connection with database")
	}
}
module.exports = {
	sequelize,
	sequelizeSetup,
}
