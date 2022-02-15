import { Box, Flex, HStack, Divider } from "@chakra-ui/react"
import { ChangeColorMode } from "./utils/ChangeColorMode"
import { Login } from "./utils/Logging"
import SearchBar from "./utils/SearchBar"
const { user } = require("../utils/User")
import { StoreIcon } from "./utils/StoreIcon"
import { UserProfile } from "./utils/UserProfile"
export const Nav = () => {
	return (
		<Box size="21rem">
			<Flex p={2} dir="row" justifyContent="space-between">
				<StoreIcon />
				<HStack spacing={10}>
					<SearchBar />

					{user.userInfo ? <UserProfile /> : <Login />}
					<ChangeColorMode />
				</HStack>
			</Flex>
			<Divider variant="solid" />
		</Box>
	)
}
