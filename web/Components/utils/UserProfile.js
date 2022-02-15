import { Button, useColorModeValue } from "@chakra-ui/react"
import { useRouter } from "next/router"
const { user } = require("../../utils/User")
import { Login } from "./Logging"
export const UserProfile = () => {
	const color = useColorModeValue("gray.800", "gray.100")

	const router = useRouter()
	if (user.userId) {
		return (
			<Button
				lineHeight="inherit"
				onClick={() => {
					router.push(`/profile/${user.userId}`)
				}}
				color={color}
				variant="link"
				size="md"
			>
				{user.getFullName() ? user.getFullName() : <Login />}
			</Button>
		)
	} else {
		return <></>
	}
}
