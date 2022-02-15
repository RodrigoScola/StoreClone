import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { useRouter } from "next/router"
import string from "lodash/string"

const SearchBar = () => {
	const [buttonClicked, clickButton] = useState(false)
	const router = useRouter()
	const [search, useSearch] = useState()
	if (!buttonClicked) {
		return (
			<>
				<Button onClick={clickButton}>
					<SearchIcon />
				</Button>
			</>
		)
	}
	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault()
					router.push(`/search/${string.toLower(search)}`)
				}}
			>
				<InputGroup>
					<Input
						onChange={e => {
							useSearch(e.target.value)
							console.log(e.target.value)
						}}
						placeholder={search}
					/>
					<InputRightElement>
						<Button variant="ghost" type="submit">
							<SearchIcon />
						</Button>
					</InputRightElement>
				</InputGroup>
			</form>
		</>
	)
}
export default SearchBar
