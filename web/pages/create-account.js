import { Box, Input, VStack, Button, Alert, AlertIcon } from "@chakra-ui/react"
import { useState } from "react"
const { user } = require("../utils/User")
import { useRouter } from "next/router"
const server = require("../utils/server")
const string = require("lodash/string")
export default function CreateAccount() {
	const router = useRouter()
	// add form validation
	// if email exists in database, warn
	// if passwords doenst match
	// on submit call server.createUser(formInfo)
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
	const Width = ["200px", "400px", "600px"]
	const handleSubmit = e => {
		e.preventDefault()
		if (!passwordMatch()) return
		server.createUser(data).then(res => {
			console.log(res)
			router.push("/")
		})
	}
	const handleChange = e => {
		setData({ ...data, [e.target.name]: e.target.value })
		console.log(data.email)
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
					{Object.keys(data).map(value => {
						let obj = <Input name={value} onChange={handleChange} w={Width} required />
						if (typeof data[value] !== "string") {
							obj = (
								<Input
									name={value}
									w={Width}
									onChange={handleChange}
									type={typeof data[value]}
									min="13"
									max="99"
									required
								/>
							)
						}
						if (value == "email") {
							obj = <Input w={Width} name={value} onChange={handleChange} type="email" required />
						}
						return (
							<Box>
								<VStack>
									<label htmlFor={value}>{string.capitalize(string.lowerCase(value))}</label>
									{obj}
								</VStack>
							</Box>
						)
					})}
					<br />
					<Button m="9" type="submit" colorScheme="whatsapp">
						Submit
					</Button>
				</VStack>
			</form>
		</>
	)
}
