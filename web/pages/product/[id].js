const server = require("../../utils/server")
import { Box, Text, Divider, Image, Link } from "@chakra-ui/react"
import { User } from "../../utils/User"
import { ProductsComponent } from "../../Components/products/ProductsComponent"
import useUserInfo from "../../Components/utils/hooks/useUserInfo"
import { useEffect, useState } from "react"
import { DeleteProduct } from "../../Components/products/DeleteProduct"
import { BuyProduct } from "../../Components/products/buyProduct"
import { useRouter } from "next/router"
import { BadgesComponent } from "../../Components/products/BadgesComponent"
const string = require("lodash/string")
const { getFromId } = require("../../utils/Product")
export default function ProfilePage({ product, file, userInfo, otherProducts, stripe }) {
	let [id] = useUserInfo()
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
			<br />
			<BadgesComponent badges={product.badges} />
			<Text>{product.description}</Text>
			<Divider />
			<Text>PRICE: {product.price}</Text>
			<Box>
				{id == userInfo.userId ? <DeleteProduct id={product.id} /> : null}
				<Text color="lightblue">
					<Link
						onClick={() => {
							router.push(`/profile/${userInfo.userId}`)
						}}
					>{`${string.capitalize(userInfo.firstName)} ${string.capitalize(userInfo.lastName)}`}</Link>
				</Text>
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
	let { product, stripe: stripe } = await server.fetchData("products/id", { id }).then(res => {
		return { product: res.product, stripe: res.stripe }
	})

	product = JSON.parse(product)
	stripe = JSON.parse(stripe)
	const newUser = new User()
	const file = await server.getFile(product)
	console.log(product)
	const userInfo = await newUser.getUser(product.userId)
	console.log(userInfo)
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
		paths: [{ params: { id: "a77ed7b4-dc38-40f3-8e38-7fbc4e3925a3" } }],
		fallback: true,
	}
}
