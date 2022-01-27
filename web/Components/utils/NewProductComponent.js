import { Box, Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
export default function NewProductComponent() {
	const router = useRouter()
	return (
		<Box pt="1">
			<Button
				variant="solid"
				bg="whatsapp.500"
				onClick={() => {
					router.push(`/new-product`)
				}}
			>
				New Product
			</Button>
		</Box>
	)
}
