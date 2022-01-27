import { ImContrast, ImSun } from "react-icons/im"
import { Box, IconButton, useColorMode, useColorModeValue, Button } from "@chakra-ui/react"
import { IconComponent } from "../IconComponent"
export const ChangeColorMode = ({ size, props }) => {
	const { colorMode, toggleColorMode } = useColorMode()
	const ColorIcon = colorMode == "light" ? ImSun : ImContrast

	return (
		<Box boxSize={size}>
			<IconButton
				onClick={toggleColorMode}
				colorScheme="whatsapp"
				aria-label="color of the icon"
				icon={<ColorIcon size="1.25rem" />}
			/>
		</Box>
	)
}
