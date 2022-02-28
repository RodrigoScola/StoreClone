import { Button } from "@chakra-ui/react"
import { Router, useRouter } from "next/router"
import { useEffect, useState } from "react"

const stripe = require("stripe")(
	"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"
)
export default function BuyStripe({ id, product }) {
	const router = useRouter()
	const [session, setSession] = useState()
	useEffect(async () => {
		const result = await stripe.checkout.sessions.create({
			line_items: [
				{
					price: id,
					quantity: 1,
				},
			],
			mode: "payment",
			success_url: "https://stripe.com/docs/error-handling",
			cancel_url: `https://www.codecademy.com/learn`,
		})
		setSession(result)
	}, [])
	try {
	} catch (err) {
		console.log(err)
	}
	return (
		<Button
			onClick={() => {
				console.log(session)
			}}
			disabled={!session}
		>
			buy Product
		</Button>
	)
}
