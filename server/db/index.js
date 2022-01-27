const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("amazonStore", "postgres", "1212roro", {
	host: "localhost",
	dialect: "postgres",
	port: 5432,
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
