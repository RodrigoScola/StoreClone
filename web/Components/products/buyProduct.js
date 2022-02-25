import React, { useEffect } from "react"
import { Button } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"

export const BuyProduct = ({ productId, product }) => {
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
			<Link
				passHref
				href={{
					pathname: "/api/checkout",
					query: {
						productId,
						product,
					},
				}}
			>
				<Button color="whatsapp.100">BuyProduct</Button>
			</Link>
		</>
	)
}
