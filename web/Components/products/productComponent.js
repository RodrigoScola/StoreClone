import { Box, HStack, Text, Image, Button } from "@chakra-ui/react"
import { BadgesComponent } from "./BadgesComponent"
import { useRouter } from "next/router"
export const ProductComponent = ({ product, file }) => {
	const router = useRouter()
	return (
		<Box
			as="button"
			variant="solid"
			p={2}
			onClick={() => {
				router.push(`/product/${product.id}`)
			}}
			borderWidth="1px"
			borderRadius="lg"
			m={2}
		>
			<Box w={[175, 200, 200]}>
				<Image src={file} pb="2" />
				<BadgesComponent badges={product.badges} />
				{/* get a better font */}
				<Box fontWeight="semibold" letterSpacing="wide" textTransform="capitalize">
					<HStack spacing="auto">
						<Text>{product.name}</Text>
						<Text>{product.price ? product.price : "FREE"}</Text>
					</HStack>
				</Box>
				<Box fontSize="0.9em" color="gray.500" isTruncated>
					{product.description}
				</Box>
			</Box>
		</Box>
	)
}
