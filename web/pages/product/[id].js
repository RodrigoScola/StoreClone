const server = require("../../utils/server")
import { Avatar, Box, Wrap, WrapItem, Text, Divider, Image, Button } from "@chakra-ui/react"
import { User } from "../../utils/User"
import { ProductsComponent } from "../../Components/products/ProductsComponent"
import useUserInfo from "../../Components/utils/hooks/useUserInfo"
import { useEffect } from "react"
import { DeleteProduct } from "../../Components/products/DeleteProduct"
import { BuyProduct } from "../../Components/products/buyProduct"
import { useRouter } from "next/router"
const string = require("lodash/string")
const { getProducts, getFromId } = require("../../utils/Product")
export default function ProfilePage({ product, file, userInfo, otherProducts, stripe }) {
	let [id, { verified }] = useUserInfo()
	const router = useRouter()
	useEffect(() => {
		if (router.query.success) {
			server.sendEmail("purchase", { product, userInfo }).then(res => {
				console.log(res)
				router.replace(`/product/${product.id}`)
			})
		}
	}, [])
	if (!product) return <>product not found</>
	console.log(id, userInfo)
	return (
		<>
			<Text fontSize="2xl">{string.capitalize(product.name)}</Text>
			{/* image */}
			<Image src={file} borderRadius="15px" width={300} alt={product.name} />
			{/* desc */}
			<Divider />
			<Text>{product.description}</Text>
			<Divider />
			<Text>PRICE: {product.price}</Text>
			<Box>
				{id == userInfo.userId ? <DeleteProduct id={product.id} /> : null}
				<Text>{`${string.capitalize(userInfo.firstName)} ${string.capitalize(userInfo.lastName)}`}</Text>
				<Text>{userInfo.email}</Text>
			</Box>
			<BuyProduct productId={stripe.id} product={product.id} />
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
	let { product, stripe } = await server.fetchData("products/id", { id })
	if (!product)
		return {
			props: {},
		}
	product = JSON.parse(product)
	stripe = JSON.parse(stripe)
	console.log(stripe)
	// console.log(product)
	const newUser = new User()
	const file = await server.getFile(product)

	const userInfo = await newUser.getUser(product.userId)
	const otherProducts = await getFromId(product.userId, product.id)
	return {
		props: {
			product,
			stripe,
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
