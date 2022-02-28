console.log(process.env.STRIPE_SECRET)
const stripe = require("stripe")(
	// this only happens server side so its okay to be on a string
	"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"
)
console.log(process.env.STRIPE_SECRET)
export default async function handler(req, res) {
	try {
		console.log(req.query.id)
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					price: req.query.productId,
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: `https://web-rodrigoscola.vercel.app/product/${req.query.product}/?success=true`,
			cancel_url: `https://web-rodrigoscola.vercel.app/?canceled=true`,
		})
		console.log(session)
		res.redirect(303, session.url)
	} catch (err) {
		res.status(err.statusCode || 500).json(err.message)
	}
}
