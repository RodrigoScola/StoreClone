const server = require("./server")

export const getProductsFromServer = async (id = null) => {
	let prod = await server.fetchData("products/get-all")

	return JSON.parse(prod)
}
const getProduct = async () => {
	const prod = await getProductsFromServer()
	const files = await getFilesfromServer(prod)
	return {
		prod: prod,
		files,
	}
}
const getFromId = async (id, pId) => {
	let prod = await server.fetchData("products/getFromId", { id, pId }).then(res => {
		return JSON.parse(res)
	})
	const files = await getFilesfromServer(prod)

	return {
		prod,
		files,
	}
}
const getProductsByCategory = async query => {
	const products = await server.fetchData(`products/category/${query}`).then(res => {
		return JSON.parse(res)
	})
	const files = await getFilesfromServer(products)
	return {
		prod: products,
		files,
	}
}

const getProductsBySearch = async query => {
	const products = await server.fetchData(`products/${query}`).then(res => {
		return JSON.parse(res)
	})
	const files = await getFilesfromServer(products)
	return {
		prod: products,
		files,
	}
}
//add an getproduct by id
export const getFilesfromServer = async products => {
	let files = products.map(async value => {
		const file = await server.getFile(value)
		return file
	})
	return await Promise.all(files).then(res => {
		files = [res]
		return files[0]
	})
}
module.exports = {
	getProductsFromServer,
	getProductsBySearch,
	getProductsByCategory,
	getFilesfromServer,
	getProduct,
	getFromId,
}
