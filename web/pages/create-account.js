import { Box, Input, VStack, Button, Alert, AlertIcon } from "@chakra-ui/react"
import { useState } from "react"
const storage = require("../utils/Storage")
const server = require("../utils/server")
const string = require("lodash/string")
import { useRouter } from "next/router"
import { user } from "../utils/User"
import { RenderForm } from "../Components/utils/RenderForm"
export default function CreateAccount() {
	const router = useRouter()

	const [error, setError] = useState()
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		age: 0,
		email: "",
		password: "",
		confirmPassword: "",
		city: "",
		country: "",
		phoneNumber: "",
		zipCode: "",
		billingAddress: "",
	})
	const [image, setImage] = useState({})

	const handleSubmit = e => {
		e.preventDefault()
		if (!passwordMatch()) return
		server.createUser(data).then(res => {
			// console.log(res.user.id)
			storage.addCookie("userid", res.user.id)
			server.uploadFile(image, res.user.id, "profilePicture").then(resolution => {
				console.log(resolution)
			})
			user.login({ email: res.user.email, password: data.password }).then(
				router.push(`/profile/${res.user.id}`)
			)
			// router.push(`/validate-account/${res.user.id}`)
		})
	}
	const handleImage = e => {
		setImage(e.target.files[0])
		console.log(image)
	}
	const handleChange = e => {
		setData({ ...data, [e.target.name]: e.target.value })
	}
	const passwordMatch = () => {
		if (data.password == data.confirmPassword) {
			return true
		}
		setError("passwords do not match")
		return false
	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				<VStack>
					{error ? (
						<Alert status="error">
							<AlertIcon />
							{error}
						</Alert>
					) : null}
					{<RenderForm data={data} handleChange={handleChange} />}
					<Input type="file" id="profilePic" onChange={e => handleImage(e)} required />
					<br />
					<Button m="9" type="submit" colorScheme="whatsapp">
						Submit
					</Button>
				</VStack>
			</form>
		</>
	)
}
