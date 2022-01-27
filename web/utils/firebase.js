import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes, upload } from "firebase/storage"

const firebaseConfig = {
	apiKey: "AIzaSyDhWuUUIMUczvhJEE8qiKyjpQVkruQ8ryQ",
	authDomain: "store-dfd55.firebaseapp.com",
	projectId: "store-dfd55",
	storageBucket: "store-dfd55.appspot.com",
	messagingSenderId: "516320116991",
	appId: "1:516320116991:web:9979294f18e3ce49430cca",
}
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

module.exports = storage
