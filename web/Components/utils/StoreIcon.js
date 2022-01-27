import { Box, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
export const StoreIcon = ({ props }) => {
	const router = useRouter()
	return (
		<Box as="button">
			<Text
				onClick={() => {
					router.push("/")
				}}
				fontSize="22px"
				fontFamily="Pacifico"
			>
				The Store
			</Text>
		</Box>
	)
}
