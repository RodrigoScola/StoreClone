import { ChakraProvider } from "@chakra-ui/react"

import { Nav } from "../Components/Navbar"
import theme from "../theme"

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Nav />
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
