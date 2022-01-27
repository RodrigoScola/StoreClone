import {
	Badge,
	Box,
	Flex,
	HStack,
	Input,
	Spacer,
	Textarea,
	VStack,
	Button,
	Select,
	SelectField,
} from "@chakra-ui/react"
const server = require("../utils/server")
import { useRouter } from "next/router"
import { useState, useEffect, Component } from "react"
import { User, user } from "../utils/User"
const uploadFile = require("../utils/firebase")
export default function NewProduct({}) {
	const router = useRouter()
	const [Medals, alterBadge] = useState([])
	const [image, changeImage] = useState({})
	const [data, useData] = useState({
		name: "",
		description: "",
		price: 0,
		userId: "94de04bb-d106-4b25-9ccd-d0ae30a8b206",
		badges: [],
		category: "Beleza",
		filename: "sdfgsdfgd",
	})
	useEffect(() => {
		user.localStorageUserInfo().then(res => {
			useData({
				...data,
				userId: res.userId.objValue,
			})
			console.log(data)
		})
	}, [router])
	const changeValue = e => {
		useData({ ...data, [e.target.name]: e.target.value })
	}
	const changeFile = e => {
		changeImage({ file: e.target.files[0] })
		useData({ ...data, filename: e.target.files[0].name })
	}
	const categories = ["beleza", "informacao", "google"]
	let tags = ["free", "new", "used", "free shipping", "discount", "limited supply"]
	const SubmitForm = async e => {
		e.preventDefault()
		console.log()
		useData({ ...data, badges: Medals, photos: image, filename: image.file.name })
		console.log(data)
		await server.fetchData("products/create-product", data).then(res => {
			changeImage({ ...image, productInfo: res })
			server.uploadFile(image, "94de04bb-d106-4b25-9ccd-d0ae30a8b206", res.id).then(() => {
				router.push(`/product/${res.id}`)
			})
			console.log(res, "this is the re")
		})
	}

	return (
		<Flex justifyContent="center">
			<form onSubmit={e => SubmitForm(e)}>
				<VStack spacing="20px">
					{/* name */}
					<label htmlFor="name">Name: </label>
					<Input name="name" id="name" onChange={changeValue} required />
					{/* description */}
					<label for="description">description</label>
					<Textarea id="description" name="description" type="textarea" onChange={changeValue} />
					{/* price */}
					<label for="price">Price</label>
					<Input onChange={changeValue} name="price" id="price" type="number" placeholder="a price" />
					{/* photos */}
					<label for="photos">Photos</label>
					<Input
						required
						id="photos"
						onChange={e => {
							changeFile(e)
						}}
						type="file"
					></Input>
					{/* tags */}
					<HStack>
						{Medals.map(value => {
							return (
								<Badge
									bg="facebook.400"
									colorScheme="facebook"
									borderRadius="full"
									onClick={() => {
										alterBadge(
											Medals.filter(item => {
												return item != value
											})
										)
									}}
								>
									{value}
								</Badge>
							)
						})}
					</HStack>
					<HStack spacing="1">
						{tags.map(value => {
							return (
								<Badge
									borderRadius="full"
									bg="whatsapp.600"
									onClick={() => {
										if (Medals.indexOf(value) == -1) {
											alterBadge([...Medals, value])
											tags.filter(item => {
												return item !== value
											})
										}
									}}
									name={value}
									id={value}
								>
									{value}
								</Badge>
							)
						})}
					</HStack>
					<Select placeholder="Category">
						{categories.map(value => {
							return <option>{value}</option>
						})}
					</Select>
					<Button type="submit">Submit</Button>
				</VStack>
			</form>
		</Flex>
	)
}
export async function getStaticProps() {
	const userInfo = await user.localStorageUserInfo()
	console.log(userInfo)
	return {
		props: {
			userInfp: "asdfsf",
		},
	}
}
