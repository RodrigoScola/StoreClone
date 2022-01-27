const firebaseStorage = require("../utils/firebase")
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
class Server {
	constructor() {
		this.baseLink = "http://localhost:4001"
	}
	async createUser({ firstName, lastName, password, email, age }) {
		const user = await this.fetchData("user/create-user", {
			firstName: firstName,
			lastName: lastName,
			password: password,
			email: email,
			age: age,
		})
		console.log(user)
		return user
	}
	async getUserEmailPassword(email, password) {
		const user = await this.fetchData("user/login", { email: email, password: password })
		return user
	}
	async fetchData(link, body = { id: "f146f5c0-77dd-11ec-826d-f35d0f072756" }) {
		let data
		try {
			data = await fetch(`${this.baseLink}/${link}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			})
				.then(res => {
					return res.json()
				})
				.then(jsondata => {
					return jsondata.message
				})
		} catch (err) {
			console.log(err)
		}

		return data
	}
	uploadFile = async (file, userId, id) => {
		const userFile = file.file
		const productInfo = file.productInfo
		const productsRef = ref(firebaseStorage, `${userId}/${id}/${userFile.name}`)
		const image = await uploadBytes(productsRef, userFile).then(snapshot => {
			console.log(snapshot)
		})
		console.log(image)
		return image
	}
	async getFile(product) {
		const productsRef = ref(firebaseStorage, `${product.userId}/${product.id}/${product.filename}`)
		const file = await getDownloadURL(productsRef)
		return file
	}
}
const server = new Server()
module.exports = server
