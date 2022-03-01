const express = require("express")
const { createProduct } = require("../db/models/Product")
const {
	getAllProducts,
	getProduct,
	getProductFromUserId,
	getProductsBySearch,
	getProductByCategory,
	deleteProduct,
} = require("../queries/ProductQueries")
const stripeSDK = require("../utils/stripe")

const productRouter = express.Router()

productRouter.use("/create-product", async (req, res) => {
	const { name, description, filename, price, userId, badges, category, quantity } = req.body
	try {
		const product = await createProduct({
			userId,
			description,
			price,
			name,
			photos: ["thing1", "thing2"],
			badges,
			category,
			filename,
			quantity,
		})

		await stripeSDK.products.createProduct({
			name: product.name,
			productId: product.id,
			unitAmount: product.price * 100,
		})
		res.send({ message: product })
	} catch (err) {
		res.send({ message: err })
	}
})
productRouter.use("/get-all", async (req, res) => {
	try {
		let products = await getAllProducts()
		res.send({ message: products })
	} catch (err) {
		res.send({ message: null })
	}
})
// getBy id
productRouter.use("/id", async (req, res) => {
	try {
		const { id } = req.body
		const skd = await stripeSDK.products.getProduct(id)
		const product = await getProduct("id", id)
		res.send({
			message: {
				product,
				stripe: JSON.stringify(skd),
			},
		})
	} catch (err) {
		res.send({
			message: {
				product: null,
				stripe: null,
			},
		})
	}
})
productRouter.post("/getFromId", async (req, res) => {
	const { id, pId } = req.body
	const products = await getProductFromUserId(id, pId)
	console.log(products)
	res.send({ message: products })
})
productRouter.post("/category/:query", async (req, res) => {
	const product = await getProductByCategory(req.params.query)
	console.log(product)
	res.send({ message: product })
})
productRouter.post("/test", (req, res) => {
	res.send({ message: "asoidfjs" })
})
productRouter.post("/delete-product", async (req, res) => {
	const { id, userId = null } = req.body
	const deleted = await deleteProduct({ id, userId })
	res.send({ message: deleted })
})
productRouter.post("/payment", async (req, res) => {
	const { id } = req.body
	const product = await stripeSDK.products.getProduct(id)
	res.send({ message: product })
})
productRouter.post("/:query", async (req, res) => {
	const products = await getProductsBySearch(req.params.query)

	res.send({ message: products })
})

module.exports = productRouter
