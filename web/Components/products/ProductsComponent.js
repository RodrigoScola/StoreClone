import { Flex, Box, Badge, Image, Text, HStack } from "@chakra-ui/react"
import { ProductComponent } from "./productComponent"
export function ProductsComponent({ products }) {
	if (!products) {
		return <>no prod found</>
	}
	return (
		<Flex justifyContent="center" flexWrap="wrap">
			{products.prod.map((value, idx) => {
				return <ProductComponent product={value} file={products.files[idx]} />
			})}
		</Flex>
	)
}
