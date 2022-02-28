const server = require("../../utils/server")
import { Avatar, Box, Text, Divider, VStack } from "@chakra-ui/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import useUserInfo from "../../Components/utils/hooks/useUserInfo"
import { LogOut } from "../../Components/utils/Logging"
import NewProductComponent from "../../Components/utils/NewProductComponent"
import { UpdateInfoComponent } from "../../Components/utils/updateInfo"
import { WarnAlert } from "../../Components/utils/warning"
import { user } from "../../utils/User"
const string = require("lodash/string")
const { getProduct } = require("../../utils/Product")
export default function ProfilePage({ id }) {
	let [userId, value] = useUserInfo()
	const [data, setData] = useState({})

	useEffect(async () => {
		if (id) {
			let userInfo = await user.getUser(id)
			let products = await getProduct()
			const file = await server.getFile({
				userId: id,
			})
			setData({
				userInfo,
				products,
				file,
			})
		}
	}, [id])
	if (!data.userInfo) return <>user not found</>
	const name = `${string.capitalize(data.userInfo.firstName)} ${string.capitalize(data.userInfo.lastName)}`
	let component
	if (value && userId == data.userInfo.userId) {
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
					handleSubmit={user.deleteAccount}
				/>
				<LogOut />
			</VStack>
		)
	}
	return (
		<Box m="15">
			{data.file ? <Avatar size="2xl" src={data.file} /> : null}
			<Text>{name}</Text>
			<Text>{data.userInfo.email}</Text>
			<Text>
				{data.userInfo.verified ? "verified account" : <Link href="/validate-account">verify account</Link>}
			</Text>
			{component}
			<Divider />
			{/* <ProductsComponent products={products} /> */}
		</Box>
	)
}
export async function getStaticProps({ params }) {
	const { id } = params
	return {
		props: {
			id,
		},
	}
}
export async function getStaticPaths() {
	return {
		paths: [{ params: { id: "0d3684bf-aeb9-4b41-a95b-3b783a56ed4a" } }],
		fallback: true,
	}
}
