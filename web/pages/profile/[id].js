const server = require("../../utils/server")
import { Avatar, Box, Wrap, WrapItem, Text, Divider } from "@chakra-ui/react"
import { ProductsComponent } from "../../Components/products/ProductsComponent"
import { LogOut } from "../../Components/utils/Logging"
import NewProductComponent from "../../Components/utils/NewProductComponent"
import { user } from "../../utils/User"
const string = require("lodash/string")
const { getProduct } = require("../../utils/Product")
export default function ProfilePage({ user, products }) {
	console.log(user)
	if (!user) return <>user not found</>
	const name = `${string.capitalize(user.firstName)} ${string.capitalize(user.lastName)}`

	return (
		<Box m="15">
			<Avatar size="2xl" />
			<Text>{name}</Text>
			<Text>{user.email}</Text>
			<NewProductComponent />
			<br />
			<LogOut />
			<Divider />
			<ProductsComponent products={products} />
		</Box>
	)
}
export async function getStaticProps({ params }) {
	const { id } = params
	const { firstName, lastName, email } = await user.getUser(id)
	let products = await getProduct()
	return {
		props: {
			user: {
				firstName,
				lastName,
				email,
			},
			products: products,
		},
	}
}
export async function getStaticPaths() {
	return {
		paths: [{ params: { id: "1" } }, { params: { id: "f146f5c0-77dd-11ec-826d-f35d0f072756" } }],
		fallback: true,
	}
}
