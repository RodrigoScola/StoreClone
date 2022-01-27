import { HStack } from "@chakra-ui/react"
export const BadgesComponent = ({ badges }) => {
	return (
		<HStack spacing="2.5">
			{!badges
				? null
				: badges.map(badge => {
						console.log("badge", badge)
						return (
							<Badge bg="whatsapp.500" color="white.900" borderRadius="full">
								{badge}
							</Badge>
						)
				  })}
		</HStack>
	)
}
