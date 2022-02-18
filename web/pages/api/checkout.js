const stripe = require("stripe")(
	"sk_test_51KR12VC6yP4tONR77gaPex8PvSdlxl1ynq01mHFVm6dYP6J9EEULPHLxoMY3koRSQXkC5ydqPFeh7PTj8UqyhZ6900DDrcbSWJ"
)

export default async function handler(req, res) {
	// if (req.method === "POST") {
	try {
		// Create Checkout Sessions from body params.
		console.log(req.query.id)
		const session = await stripe.checkout.sessions.create({
			line_items: [
				{
					// Provide the exact Price ID (for example, pr_1234) of the product you want to sell
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
	// } else {
	// 	res.setHeader("Allow", "POST")
	// 	res.status(405).end("Method Not Allowed")
	// }
}
