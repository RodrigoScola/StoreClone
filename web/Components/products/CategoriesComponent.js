import { VStack, Flex, Box } from "@chakra-ui/react"
import Link from "next/link"
import { categories } from "../../constants"

export default function CategoriesComponent() {
	return (
		<Box>
			<Flex flexDir="column">
				{categories.map(value => {
					return <Link href={`/search/${value}`}>{value}</Link>
				})}
			</Flex>
		</Box>
	)
}
