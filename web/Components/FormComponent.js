export default function FormComponent({ children }) {
	console.log(children)
	return (
		<form>
			{children}
			<button>Submit</button>
		</form>
	)
}
