import CategoriesComponent from "../Components/products/CategoriesComponent"
import { ProductsComponent } from "../Components/products/ProductsComponent"
import { getProduct } from "../utils/Product"
export default function Home({ products }) {
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
