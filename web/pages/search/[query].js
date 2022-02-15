import { getProductsByCategory } from "../../utils/Product"
import { ProductsComponent } from "../../Components/products/ProductsComponent"
import { categories } from "../../constants"

const { getProductsBySearch } = require("../../utils/Product")
export default function SearchPage({ query }) {
	console.log(query)
	if (!query) {
		return <h1>no product was found</h1>
	}
	return (
		<>
			<ProductsComponent products={query} />
		</>
	)
}
export async function getStaticPaths() {
	return {
		paths: [{ params: { query: "1" } }, { params: { query: "f146f5c0-77dd-11ec-826d-f35d0f072756" } }],
		fallback: true,
	}
}
export async function getStaticProps({ params }) {
	const { query } = params
	let products
	if (categories.includes(query)) {
		products = await getProductsByCategory(query)
	} else {
		products = await getProductsBySearch(query)
	}
	return {
		props: {
			query: products,
		},
	}
}
