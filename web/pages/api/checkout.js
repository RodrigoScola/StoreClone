const stripe = require("stripe")(
	// this is a public key
	"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"
)

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
			success_url: `http://localhost:3000/product/${req.query.product}/?success=true`,
			cancel_url: `http://localhost:3000/?canceled=true`,
		})
		res.redirect(303, session.url)
		res.send(req.query)
	} catch (err) {
		res.status(err.statusCode || 500).json(err.message)
	}
}
