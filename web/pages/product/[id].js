const server = require("../../utils/server")
import { Avatar, Box, Wrap, WrapItem, Text, Divider, Image } from "@chakra-ui/react"
import { User } from "../../utils/User"
import { ProductsComponent } from "../../Components/products/ProductsComponent"
const string = require("lodash/string")
const { getProducts, getFromId } = require("../../utils/Product")
export default function ProfilePage({ product, file, userInfo, otherProducts }) {
	if (!product) return <>product not found</>
	return (
		<>
			<Text fontSize="2xl">{string.capitalize(product.name)}</Text>
			{/* image */}
			<Image src={file} borderRadius="15px" width={300} alt={product.name} />
			{/* desc */}
			<Divider />
			<Text>{product.description}</Text>
			<Divider />
			<Box>
				<Text>{`${string.capitalize(userInfo.firstName)} ${string.capitalize(userInfo.lastName)}`}</Text>
				<Text>{userInfo.email}</Text>
			</Box>
			<Box>
				<Text>Products from the same user that you might like </Text>
				<Box>
					<ProductsComponent products={otherProducts} />
				</Box>
			</Box>
		</>
	)
}
export async function getStaticProps({ params }) {
	const { id } = params
	let product = await server.fetchData("products/id", { id })
	product = JSON.parse(product)
	const newUser = new User()
	const file = await server.getFile(product)
	const userInfo = await newUser.getUser(product.userId)
	const otherProducts = await getFromId(product.userId, product.id)
	return {
		props: {
			product,
			file,
			userInfo,
			otherProducts,
		},
	}
}
export async function getStaticPaths() {
	return {
		paths: [{ params: { id: "1" } }, { params: { id: "f146f5c0-77dd-11ec-826d-f35d0f072756" } }],
		fallback: true,
	}
}
