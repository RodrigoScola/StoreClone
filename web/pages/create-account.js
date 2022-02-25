import { Input, VStack, Button, Alert, AlertIcon } from "@chakra-ui/react"
import { useEffect, useState } from "react"
const storage = require("../utils/Storage")
const server = require("../utils/server")
import { useRouter } from "next/router"
import { user } from "../utils/User"
import { RenderForm } from "../Components/utils/RenderForm"
export default function CreateAccount() {
	const router = useRouter()
	useEffect(() => {})
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
	const [image, setImage] = useState()

	const handleSubmit = e => {
		console.log(data)
		e.preventDefault()
		if (!passwordMatch()) return
		server.createUser(data).then(res => {
			// storage.addCookie("userid", res.user.id)
			console.log(res.user.id)
			server
				.uploadFile(image, res.user.id, "profilePicture")
				.then(resolution => {
					console.log(resolution)
				})
				.then(() => {
					user.login({ email: res.user.email, password: data.password })

					// router.push(`/profile/${res.user.id}`)
				})
		})
	}
	const handleImage = e => {
		setImage(e.target.files[0])
	}
	const handleChange = e => {
		setData({ ...data, [e.target.name]: e.target.value })
		console.log(e.target.name)
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
					{<RenderForm data={data} setData={setData} />}
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
