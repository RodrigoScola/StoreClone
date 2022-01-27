const { Op } = require("sequelize")
const { Product } = require("../db/models/Product")
const { User } = require("../db/models/User")
const { validatePassword } = require("../utils/hashing")

/**
 * @description gets all users in database
 * @returns information about all users
 */
const getAllProducts = async (offset = null) => {
	const product = await Product.findAll()
	return await JSON.stringify(product, null, 2)
}

const getProduct = async (idName, id) => {
	try {
		const product = await Product.findOne({
			where: {
				[idName]: id,
			},
		})
		return await JSON.stringify(product, null, 2)
	} catch (err) {}
}

const getProductFromUserId = async (userId, pId) => {
	const products = await Product.findAll({
		where: {
			userId,
			id: {
				[Op.ne]: pId,
			},
		},
	})
	return await JSON.stringify(products, null, 2)
}
// get from search

// get from category

module.exports = {
	getAllProducts,
	getProduct,
	getProductFromUserId,
}
