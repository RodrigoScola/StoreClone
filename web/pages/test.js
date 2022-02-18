import React, { useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@chakra-ui/react"
import Link from "next/link"
import { Router, useRouter } from "next/router"

export default function Test() {
	useEffect(() => {
		const query = new URLSearchParams(window.location.search)
		if (query.get("success")) {
			console.log("order placed")
		}
		if (query.get("cancelled")) {
			console.log("order cancelled")
		}
	}, [])
	const router = useRouter()

	return (
		<>
			<form action="/api/checkout" method="POST">
				<Link
					href={{
						pathname: "/api/checkout",
						query: {
							name: "aisd",
						},
					}}
				>
					asda
				</Link>
				<Button type="submit"></Button>
			</form>
		</>
	)
}
