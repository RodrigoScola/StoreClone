const server = require("./server")
const storage = require("./Storage")
const string = require("lodash/string")

class User {
	constructor() {
		this.userId = null
		this.userInfo = {
			age: 0,
			email: "",
			firstName: "",
			lastName: "",
			verified: false,
		}
		this.localStorageUserInfo()
	}
	// async getUserInformation() {
	// 	const info = await server.fetchData("user/userInfo")
	// 	return info
	// }
	async storeId() {
		const key = await storage.getCookie("userid")
		return key
	}
	localStorageUserInfo(id = null) {
		const storageValue = storage.getLocalStorage("userInfo")
		const userId = storage.getCookie("userid")
		this.userInfo = storageValue
		this.userId = userId

		return {
			storageValue,
			userId,
		}
	}

	async getUserInfo(id = this.userId) {
		if (id == null) return undefined
		if (this.localStorageUserInfo() == null) {
			const serverInfo = await server.fetchData("user/login", { id })
			this.userInfo = storage.setLocalStorage("userInfo", serverInfo)
		}
		return JSON.stringify(this.userInfo)
	}
	async login({ email, password }) {
		const userInfo = await server.getUserEmailPassword(email, password)

		this.userId = userInfo.id
		this.userInfo = userInfo
		storage.addCookie("userid", this.userId)
		storage.setLocalStorage("userId", this.userId)
		storage.setLocalStorage("userInfo", this.userInfo)
		return this.userInfo
	}
	async logout() {
		storage.deleteKey("userid")
		storage.deleteKey("userInfo")
		this.userInfo = null
		this.userId = null
		return "deleted stuff"
	}
	async alterUser({ newInfo }) {
		const updatedUser = await server.fetchData("user/update-user", { newInfo })
		return updatedUser
	}
	async getUser(id = this.userId) {
		const { firstName, lastName, email, verified } = await server.fetchData("user/get-user", {
			id,
		})
		console.log("this is the user", user)
		return {
			firstName,
			id,
			lastName,
			email,
			verified,
			id,
		}
	}
	async validateEmail(code = null) {
		const id = await this.storeId()
		if (code != null) {
			const data = await server.fetchData("user/validate", { code, id })
			return {
				user: data,
			}
		}
		const data = await server.fetchData("mail/validate-email", { id })
		console.log(data)
		return data
	}
	getFullName() {
		try {
			const { firstName, lastName } = this.userInfo
			return `${string.capitalize(firstName)} ${string.capitalize(lastName)}`
		} catch (err) {
			return null
		}
	}
}

const user = new User()
// user.validateEmail()
console.log(user)

// user.logout()
// user.login({ email: "handomizento@gmail.com", password: "1212roro" })
module.exports = { user, User }
