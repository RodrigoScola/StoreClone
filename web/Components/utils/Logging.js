const { user } = require("../../utils/User")
import { Button } from "@chakra-ui/react"
import { useRouter } from "next/router"

export const LogOut = () => {
	const router = useRouter()
	return (
		<Button
			onClick={() => {
				user.logout().then(() => {
					router.push("/")
				})
			}}
		>
			{user.userInfo ? "logout" : "login"}
		</Button>
	)
}
export const Login = () => {
	const router = useRouter()
	return (
		<Button
			onClick={() => {
				router.push("/login")
			}}
		>
			Log In
		</Button>
	)
}
