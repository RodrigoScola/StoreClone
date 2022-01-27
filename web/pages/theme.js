import { extendTheme } from "@chakra-ui/react"

// 2. Add your color mode config

// 3. extend the theme
const theme = extendTheme({
	initialColorMode: "light",
	useSystemColorMode: false,

	styles: {
		global: {
			"html, body": {
				// color: "gray.600",
				lineHeight: "tall",
			},
			a: {
				// color: "teal.500",
			},
		},
	},
})

export default theme
