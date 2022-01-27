const { css } = require("@emotion/react")
const server = require("./server")
const Storage = require("./Storage")
const storage = new Storage()
const string = require("lodash/string")

class User {
	constructor(userInfo = null) {
		this.userId = this.storeId()
		this.userInfo = null
		this.localStorageUserInfo()
	}
	storeId() {
		return storage.getLocalStorage("userId")
	}
	async localStorageUserInfo(id = null) {
		const storageValue = await storage.getLocalStorage("userInfo")
		const userId = await storage.getLocalStorage("userId")
		this.userInfo = storageValue
		this.userId = userId
		return {
			storageValue,
			userId,
		}
	}

	async getUserInfo(id = this.userId) {
		console.log("aaja")
		if (id == null) return undefined
		if (this.localStorageUserInfo() == null) {
			const serverInfo = await server.fetchData("user/login", { id })
			this.userInfo = storage.setLocalStorage("userInfo", serverInfo).objValue
		}
		return JSON.stringify(this.userInfo)
	}
	async login({ email, password }) {
		const userInfo = await server.getUserEmailPassword(email, password)
		this.userId = userInfo.id
		this.userInfo = {
			email: userInfo.email,
			firstName: userInfo.firstName,
			lastName: userInfo.lastName,
			age: userInfo.age,
		}
		storage.setLocalStorage("userId", this.userId)
		storage.setLocalStorage("userInfo", this.userInfo)
		return this.userInfo
	}
	async logout() {
		storage.deleteKey("userId")
		storage.deleteKey("userInfo")
		this.userInfo = null
		this.userId = null
		return "deleted stuff"
	}
	async getUser(id) {
		const { firstName, lastName, email } = await server.fetchData("user/get-user", { id })
		return {
			firstName,
			id,
			lastName,
			email,
		}
	}
	getFullName() {
		try {
			const { firstName, lastName } = this.userInfo.objValue
			return `${string.capitalize(firstName)} ${string.capitalize(lastName)}`
		} catch (err) {
			return null
		}
	}
}
const user = new User()
user.localStorageUserInfo().then(res => {
	console.log(res)
})

module.exports = { user, User }
