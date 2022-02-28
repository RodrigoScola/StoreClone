import { extendTheme } from "@chakra-ui/react"
const theme = extendTheme({
	initialColorMode: "light",
	useSystemColorMode: false,

	styles: {
		global: {
			"html, body": {
				lineHeight: "tall",
			},
			a: {},
		},
	},
})

export default theme
