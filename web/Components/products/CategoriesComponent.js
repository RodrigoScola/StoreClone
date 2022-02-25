import { Flex, Box } from "@chakra-ui/react"
import Link from "next/link"
import { categories } from "../../constants"

export default function CategoriesComponent() {
	return (
		<Box>
			<Flex flexDir="column">
				{categories.map((value, key) => {
					return (
						<Link key={key} href={`/search/${value}`}>
							{value}
						</Link>
					)
				})}
			</Flex>
		</Box>
	)
}
