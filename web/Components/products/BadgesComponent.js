import { HStack } from "@chakra-ui/react"
import { Badge } from "@chakra-ui/react"
export const BadgesComponent = ({ badges }) => {
	return (
		<HStack spacing="2.5">
			{!badges
				? null
				: badges.map((badge, key) => {
						return (
							<Badge key={key} bg="whatsapp.500" color="white.900" borderRadius="full">
								{badge}
							</Badge>
						)
				  })}
		</HStack>
	)
}
