import Cookies from "universal-cookie"

const cookie = new Cookies()
const store = require("store")

class Storage {
	addCookie(cookieName, cookieData) {
		const createdCookie = cookie.set(cookieName, cookieData, {
			path: "/",
			maxAge: 1000 * 60 * 60 * 24 * 10, //10 days
			secure: true,
			sameSite: true,
		})
		return createdCookie
	}
	getCookie(cookieName) {
		const setCookie = cookie.get(cookieName)
		return setCookie
	}
	setLocalStorage(key, objValue) {
		const stored = store.set(key, objValue)
		return stored
	}
	getLocalStorage(key) {
		const value = store.get(key)
		return value
	}
	deleteKey(key) {
		const deletedKey = cookie.remove(key)
		store.remove(key)
		return deletedKey
	}
	log() {
		store.each(function (value, key) {
			console.log(key, "==", value)
		})
	}
}
const storage = new Storage()
module.exports = storage
