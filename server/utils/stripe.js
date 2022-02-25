require("dotenv").config()
const stripe = require("stripe")(
	"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"
)
const stripeSDK = {
	products: {
		/**
		 * @param {string} name - name of the product
		 * @param {uuid} productId
		 * @param {unitAmount} price
		 * @returns {object} the prices and product objects
		 */
		createProduct: async ({ name, productId, unitAmount }) => {
			// product needs to be created before the price
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
				return updatedPrice
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
