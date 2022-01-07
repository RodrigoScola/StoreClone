class Server {
	constructor() {
		this.baseLink = "http://localhost:4001"
	}
	async createUser(firstName, lastName, password, email, age) {
		const user = await this.fetchData("user/create-user", {
			firstName: firstName,
			lastName: lastName,
			password: password,
			email: email,
			age: age,
		})
	}
	async getUserEmailPassword(email, password) {
		const user = await this.fetchData("user/login", { email: email, password: password })
		console.log(user)
		return user
	}
	async fetchData(link, body = null) {
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
					console.log(jsondata)
					return jsondata
				})
		} catch (err) {
			console.log(err)
		}
		return data
	}
}
module.exports = Server
