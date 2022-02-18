require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET)
const stripeSDK = {
	products: {
		createProduct: async ({ name, productId, unitAmount }) => {
			const prod = await stripe.products.create({
				name,
				id: productId,
				active: true,
				metadata: {
					priceId: `prc_${productId}`,
				},
			})
			const prices = await stripeSDK.price.createPrice({ productId, unitAmount })
			console.log(prod, prices)
			return {
				prices,
				prod,
			}
		},
		getProduct: async prodId => {
			let { data } = await stripe.prices.list({
				product: prodId,
			})

			return data[0]
		},
		updateProduct: async (prodId, newInfo = { price: null }) => {
			const updatedProd = await stripe.products.update(prodId, {
				newInfo,
			})
			if (newInfo.price) {
				const updatedPrice = await stripe.prices.update()
			}
			return updatedProd
		},
		deleteProduct: async id => {
			const deletedProd = stripe.products.del(id)
			return deletedProd
		},
	},
	price: {
		createPrice: async ({ productId, unitAmount }) => {
			const price = await stripe.prices.create({
				product: productId,
				unit_amount: unitAmount,
				currency: "brl",
			})
			return price
		},
		getPrice: async id => {
			const price = await stripe.prices.retrieve(id)
			return price
		},
		updatePrice: async (id, newInfo) => {
			const updatedPrice = await stripe.prices.update(id, newInfo)
			return updatedPrice
		},
	},
}

module.exports = stripeSDK
