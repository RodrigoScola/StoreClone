import { ColorModeScript } from "@chakra-ui/react"
import NextDocument, { Html, Head, Main, NextScript } from "next/document"
import theme from "./theme"
require("dotenv").config()

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
					<script defer src="https://js.stripe.com/v3/"></script>
				</Head>
				<body>
					{/* 👇 Here's the script */}
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
