const string = require("lodash/string")
import { Input, Box, VStack } from "@chakra-ui/react"
export const RenderForm = ({ data, setData }) => {
	const Width = ["200px", "400px", "600px"]
	const handleChange = e => {
		setData({ ...data, [e.target.name]: e.target.value })
		console.log(data.email)
	}
	return (
		<>
			{Object.keys(data).map((value, key) => {
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
				} else if (value == "email") {
					obj = <Input w={Width} name={value} onChange={handleChange} type="email" required />
				} else if (value == "password" || value == "confirmPassword") {
					obj = <Input w={Width} name={value} onChange={handleChange} type="password" required />
				}
				if (value == "id") {
					obj = null
				}
				return (
					<Box key={key}>
						<VStack>
							{obj == null ? null : (
								<>
									<label htmlFor={value}>{string.capitalize(string.lowerCase(value))}</label>
									{obj}
								</>
							)}
						</VStack>
					</Box>
				)
			})}
		</>
	)
}
