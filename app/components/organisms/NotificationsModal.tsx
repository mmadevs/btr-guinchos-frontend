import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react'

export const NotificationsModal = ({
	isOpen,
	onClose
}: {
	isOpen: boolean
	onClose: () => void
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>cabeça</ModalHeader>
				<ModalCloseButton />
				<ModalBody>corpo</ModalBody>
				<ModalFooter>pé</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
