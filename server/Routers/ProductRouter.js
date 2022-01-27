const express = require("express")
const { createProduct } = require("../db/models/Product")
const { getAllProducts, getProduct, getProductFromUserId } = require("../queries/ProductQueries")
const formidable = require("formidable")

const productRouter = express.Router()

productRouter.use("/create-product", async (req, resoluton) => {
	const { name, description, filename, price, photos, userId, badges, category } = req.body
	console.log(req.body, "this is the gouasdf")

	const product = await createProduct({
		userId,
		description,
		price,
		name,
		photos: ["thing1", "thing2"],
		badges,
		category: ["a"],
		filename,
	}).then(res => {
		console.log(res)
		resoluton.send({ message: res })
	})
})
productRouter.use("/get-all", async (req, res) => {
	const products = await getAllProducts()
	res.send({ message: products })
})
// getBy id
productRouter.use("/id", async (req, res) => {
	const { id } = req.body
	const product = await getProduct("id", id)
	res.send({ message: product })
})
productRouter.use("/getFromId", async (req, res) => {
	const { id, pId } = req.body
	const products = await getProductFromUserId(id, pId)
	console.log(products)
	res.send({ message: products })
})
productRouter.use("/test", (req, res) => {
	res.send({ message: req.body })
})
module.exports = productRouter
