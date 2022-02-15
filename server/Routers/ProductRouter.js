const express = require("express")
const { createProduct } = require("../db/models/Product")
const {
	getAllProducts,
	getProduct,
	getProductFromUserId,
	getProductsBySearch,
	getProductByCategory,
} = require("../queries/ProductQueries")

const productRouter = express.Router()

productRouter.use("/create-product", async (req, resoluton) => {
	const { name, description, filename, price, userId, badges, category, quantity } = req.body
	console.log(req.body, "this is the gouasdf")

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
	}).then(res => {
		console.log(typeof res)
		resoluton.send({ message: res })
	})
})
productRouter.use("/get-all", async (req, res) => {
	const products = await getAllProducts()
	console.log(" this is the session", req.session.user)
	res.send({ message: products })
})
// getBy id
productRouter.use("/id", async (req, res) => {
	const { id } = req.body
	const product = await getProduct("id", id)
	res.send({ message: product })
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
productRouter.post("/:query", async (req, res) => {
	const products = await getProductsBySearch(req.params.query)
	res.send({ message: products })
})
productRouter.post("/test", (req, res) => {
	res.send({ message: "asoidfjs" })
})
module.exports = productRouter
