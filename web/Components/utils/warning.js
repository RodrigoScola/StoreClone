import {
	Alert,
	AlertDescription,
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertTitle,
	AlertDialogBody,
	AlertDialogFooter,
	Button,
} from "@chakra-ui/react"
import { useState, useRef } from "react"
export const WarnAlert = ({
	ButtonText,
	CancelButton = "Cancel",
	BodyText = "",
	HeaderText,
	ConfirmButton = "Submit",
	children = "",
	handleSubmit = null,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const onClose = () => setIsOpen(false)
	const cancelRef = useRef()

	return (
		<>
			<Button colorScheme="red" onClick={() => setIsOpen(true)}>
				{ButtonText}
			</Button>

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							{HeaderText}
						</AlertDialogHeader>

						<AlertDialogBody>{BodyText ? BodyText : children}</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								{CancelButton}
							</Button>
							<Button onClick={handleSubmit} colorScheme="red" type="submit" ml={3}>
								{ConfirmButton}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	)
}
