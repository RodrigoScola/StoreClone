const firebaseStorage = require("../utils/firebase")
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
class Server {
	constructor() {
		// this.baseLink = "http://localhost:4001"
		this.baseLink = "https://pacific-garden-66630.herokuapp.com"
	}
	async createUser({ firstName, lastName, password, email, age, billingAdress, city, zipCode, country }) {
		const user = await this.fetchData("user/create-user", {
			firstName,
			lastName,
			password,
			email,
			age,
			country,
			billingAdress,
			city,
			zipCode,
		})
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
	uploadFile = async (file, userId, id = null) => {
		const userFile = file.file
		console.log(userFile)
		if (!userFile) {
			const imageRef = ref(firebaseStorage, `${userId}/profilePicture`)
			const image = await uploadBytes(imageRef, file).then(snapshot => {
				console.log(snapshot)
			})
			return image
		}
		const productsRef = ref(firebaseStorage, `${userId}/${id}/${userFile.name}`)
		const image = await uploadBytes(productsRef, userFile).then(snapshot => {})
		return image
	}
	async getFile({ userId, id = null, filename = null }) {
		if (!filename) {
			const productsRef = ref(firebaseStorage, `${userId}/profilePicture`)
			const file = await getDownloadURL(productsRef)
			return file
		}
		const productsRef = ref(firebaseStorage, `${userId}/${id}/${filename}`)
		const file = await getDownloadURL(productsRef)
		return file
	}
	async sendEmail(type, obj) {
		const serverData = await this.fetchData(`mail/${type}`, obj)
		if (serverData) {
			console.log("email sent")
			return true
		}
	}
}
const server = new Server()
server.getUserEmailPassword("handomizento@gmail.com", "1212roro")
module.exports = server
