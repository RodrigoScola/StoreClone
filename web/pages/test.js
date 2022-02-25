import React, { useEffect } from "react"
import { Button } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { getProductsFromServer } from "../utils/Product"
const { server } = require("../utils/server")
export default function Test() {
	useEffect(() => {
		getProductsFromServer().then(res => console.log(res))
	}, [])
	const router = useRouter()
	return <></>
}
