const { Op } = require("sequelize")
const { Product } = require("../db/models/Product")

/**
 * @description gets all users in database
 * @returns information about all users
 */
const getAllProducts = async (offset = null) => {
	const product = await Product.findAll()
	return await JSON.stringify(product, null, 2)
}
/**
 *  alters the product in the database
 * @param {uuid} id - users id
 * @param {object} newInfo - the information that you want to change
 * @returns {boolean} if it was updated or not
 */
const alterProduct = async ({ id, newInfo }) => {
	const updatedProduct = await Product.update(newInfo, {
		where: {
			id,
		},
	})
	return updatedProduct == 1 ? true : false
}
/**
 * gets the product based ont the idName query
 * @param {uuid} idName
 * @param {uuid} id
 * @returns the product based on the query
 */
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
/**
 *
 * @param {uuid} userId
 * @param {uuid} productsID
 * @returns all the products from the same user
 */
const getProductFromUserId = async (userId, pId) => {
	const products = await Product.findAll({
		where: {
			userId,
			id: {
				[Op.eq]: pId,
			},
		},
	})
	return await JSON.stringify(products, null, 2)
}
/**
 *
 * @param {string} query
 * @returns all the products that match the same query
 */
const getProductByCategory = async query => {
	const products = await Product.findAll({
		where: {
			category: query,
		},
	})
	return JSON.stringify(products, null, 2)
}

/**
 *
 * @param {string} query
 * @returns all the products that match the same search query
 */
const getProductsBySearch = async query => {
	const products = await Product.findAll({
		where: {
			name: {
				[Op.substring]: query,
			},
		},
	})
	return JSON.stringify(products, null, 2)
}

/**
 *
 * @param {uuid} userId
 * @param {uuid} productId
 * @returns {boolean}
 */
const deleteProduct = async ({ userId = null, id }) => {
	const deletedProduct = await Product.destroy({
		where: {
			[userId == null ? "id" : "userId"]: id ? id : userId,
		},
	})

	return deletedProduct == 1 ? true : false
}

module.exports = {
	getAllProducts,
	getProduct,
	getProductFromUserId,
	deleteProduct,
	getProductsBySearch,
	getProductByCategory,
}
