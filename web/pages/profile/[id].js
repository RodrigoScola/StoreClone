const server = require("../../utils/server")
import { Avatar, Box, Wrap, WrapItem, Text, Divider, Flex, VStack, Stack, HStack, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { ProductsComponent } from "../../Components/products/ProductsComponent"
import useUserInfo from "../../Components/utils/hooks/useUserInfo"
import { DeleteAccount, LogOut } from "../../Components/utils/Logging"
import NewProductComponent from "../../Components/utils/NewProductComponent"
import { UpdateInfoComponent } from "../../Components/utils/updateInfo"
import { WarnAlert } from "../../Components/utils/warning"
import { user } from "../../utils/User"
const string = require("lodash/string")
const { getProduct } = require("../../utils/Product")
export default function ProfilePage({ userInfo, products, file }) {
	if (!userInfo) return <>user not found</>
	const name = `${string.capitalize(userInfo.firstName)} ${string.capitalize(userInfo.lastName)}`
	let [userId, value] = useUserInfo()
	console.log(value)
	let component
	if (value && userId == userInfo.id) {
		component = (
			<VStack alignItems="flex-start" spacing="5">
				{value.verified ? (
					<>
						<NewProductComponent />
						<UpdateInfoComponent />
					</>
				) : null}
				<WarnAlert
					BodyText="this action cannot be undone"
					ButtonText="Delete Account"
					HeaderText="Delete Account"
					ConfirmButton="Delete"
				/>
				<LogOut />
			</VStack>
		)
	}
	return (
		<Box m="15">
			{file ? <Avatar size="2xl" src={file} /> : null}
			<Text>{name}</Text>
			<Text>{userInfo.email}</Text>
			<Text>{userInfo.verified ? "verified account" : "account not verified yet"}</Text>
			{component}
			<Divider />
			<ProductsComponent products={products} />
		</Box>
	)
}
export async function getStaticProps({ params }) {
	const { id } = params
	const { firstName, lastName, email, verified } = await user.getUser(id)
	let products = await getProduct()
	const file = await server.getFile({
		userId: id,
	})
	return {
		props: {
			file,
			userInfo: {
				firstName,
				lastName,
				email,
				id,
				verified,
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