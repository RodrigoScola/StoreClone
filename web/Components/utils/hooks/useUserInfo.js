import { useState, useEffect } from "react"
const { user } = require("../../../utils/User")
const useUserInfo = () => {
	const [data, setData] = useState({
		userId: null,
		value: {
			age: 0,
			email: "",
			firstName: "",
			lastName: "",
			verified: false,
		},
	})
	useEffect(() => {
		const { storageValue, userId } = user.localStorageUserInfo()
		setData({ value: storageValue, userId })
	}, [])
	return [data.userId, data.value]
}
export { useUserInfo as default }
