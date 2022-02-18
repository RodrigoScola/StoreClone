import { Badge, Box, Flex, HStack, Input, Textarea, VStack, Button, Select } from "@chakra-ui/react"
const server = require("../utils/server")
import { useRouter } from "next/router"
import { categories, tags } from "../constants"
import { useEffect, useState } from "react"
import { User, user } from "../utils/User"
const uploadFile = require("../utils/firebase")
export default function NewProduct() {
	const router = useRouter()
	const [Medals, alterBadge] = useState([])
	const [image, changeImage] = useState({})
	const [data, useData] = useState({
		name: "",
		description: "",
		price: 0,
		userId: user.userId,
		badges: [],
		category: "",
		filename: "sdfgsdfgd",
		quantity: 0,
	})
	const changeValue = e => {
		useData({ ...data, [e.target.name]: e.target.value })
	}
	const changeFile = e => {
		changeImage({ file: e.target.files[0] })
		useData({ ...data, filename: e.target.files[0].name })
	}
	const SubmitForm = async e => {
		e.preventDefault()
		useData({ ...data, badges: Medals, photos: image, filename: image.file.name })
		console.log(data.category)
		await server.fetchData("products/create-product", data).then(res => {
			changeImage({ ...image, productInfo: res })
			server.uploadFile(image, user.userId, res.id).then(() => {
				router.push(`/product/${res.id}`)
			})
		})
	}
	useEffect(() => {
		if (!user.userInfo.verified) {
			router.push("/validate-account")
		}
	}, [])
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
					<label htmlFor="quantity">quantity</label>
					<Input type="number" min={1} onChange={changeValue} max={9999} name="quantity" id="quantity" />
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
					<Select
						name="category"
						onChange={e => {
							useData({ ...data, category: e.target.value })
						}}
						placeholder="Category"
					>
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
