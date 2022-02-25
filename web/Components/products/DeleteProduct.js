import { useRouter } from "next/router"
import { deleteProduct } from "../../utils/Product"
import { WarnAlert } from "../utils/warning"

export const DeleteProduct = ({ id }) => {
	const router = useRouter()
	const handleSubmit = async () => {
		deleteProduct({ id }).then(() => {
			router.push("/")
		})
	}
	return (
		<>
			<WarnAlert ButtonText="Delete product" handleSubmit={handleSubmit} />
		</>
	)
}
