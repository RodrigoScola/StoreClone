import CategoriesComponent from "../Components/products/CategoriesComponent"
import { ProductsComponent } from "../Components/products/ProductsComponent"
import { getFilesfromServer, getProductsFromServer, getProduct } from "../utils/Product"
import { user } from "../utils/User"
const server = require("../utils/server")
export default function Home({ products, files }) {
	return (
		<>
			<CategoriesComponent />
			<ProductsComponent products={products} />
		</>
	)
}
export async function getStaticProps() {
	const prod = await getProduct()

	return {
		props: {
			products: prod,
		},
	}
}
