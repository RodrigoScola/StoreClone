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
const alterProduct = async ({ id, newInfo }) => {
	const updatedProduct = await Product.update(newInfo, {
		where: {
			id,
		},
	})
	return updatedProduct == 1 ? true : false
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
const getProductByCategory = async query => {
	const products = await Product.findAll({
		where: {
			category: query,
		},
	})
	return JSON.stringify(products, null, 2)
}

// get from search
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

// get from category

const deleteProductByUserId = async id => {
	const deletedProduct = await Product.destroy({
		where: {
			userId: id,
		},
	})
	return deletedProduct == 1 ? true : false
}

module.exports = {
	getAllProducts,
	getProduct,
	getProductFromUserId,
	deleteProductByUserId,
	getProductsBySearch,
	getProductByCategory,
}
