const store = require("../utils/Storage")
import { useEffect, useState } from "react"
import { Box, Button, Flex, Input, Text, VStack } from "@chakra-ui/react"
import Link, { useRouter } from "next/router"
import { user } from "../utils/User"
const storage = require("../utils/Storage")

export default function ValidateAccount() {
	const router = useRouter()
	const [userInfo, setUserInfo] = useState()
	const [code, setCode] = useState(null)

	const handleSubmit = async e => {
		e.preventDefault()
		user.validateEmail(code).then(res => {
			if (res.user.user == true) {
				user.logout()
				router.push("/login")
			}
		})
	}
	useEffect(() => {
		setUserInfo(user)
		user.validateEmail()
	}, [store])
	if (!userInfo) return <>h1</>
	if (userInfo) {
		return (
			<Box>
				<VStack spacing="2">
					<Flex flexDir="column">
						<h1>we have sent an email to {userInfo.userInfo.email} containing a code</h1>
						<Text>to activate your account please input the code in the box below</Text>
						<form onSubmit={handleSubmit}>
							<Flex flexDir="column">
								<label htmlFor="code">code:</label>
								<Input
									onChange={e => {
										setCode(e.target.value)
									}}
									w="200"
									type="text"
									size="md"
									required
								/>
								<Button type="submit" mt="5" colorScheme="whatsapp">
									Submit
								</Button>
							</Flex>
						</form>
					</Flex>
				</VStack>
			</Box>
		)
	}
}
