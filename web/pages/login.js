import { Button, Center, Flex, Input, Link as ChakraLink } from "@chakra-ui/react"
import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
const { user } = require("../utils/User")
export default function Login({}) {
	const router = useRouter()
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	})
	const handleChange = e => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}
	return (
		<Center>
			<Flex>
				<form
					onSubmit={async e => {
						e.preventDefault()
						user.login(userData).then(() => {
							console.log(userData)
							// router.push("/")
						})
					}}
				>
					<Flex flexDir="column">
						<label htmlFor="email">Email</label>
						<Input onChange={handleChange} name="email" id="email" type="email" required />
						<label htmlFor="password">password</label>
						<Input onChange={handleChange} type="password" name="password" required />
						<Link passHref href="/create-account">
							<ChakraLink color="dodgerblue">Create Account</ChakraLink>
						</Link>
						<Button mt="2" type="submit">
							Submit
						</Button>
					</Flex>
				</form>
			</Flex>
		</Center>
	)
}
