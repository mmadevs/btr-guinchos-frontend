import { FunctionComponent } from 'react'
import { HStack, Tooltip, Text, IconButton } from '@chakra-ui/react'
import { MdNotifications } from 'react-icons/md'

export const Header: FunctionComponent = () => {
	return (
		<HStack
			className='bg-gray-900 w-16 p-2'
			w={'full'}
			bg={'blackAlpha'}
			align={'center'}
			justify={'space-between'}
		>
			<Text fontSize={'xl'} color={'white'}>
				BTR Guinchos
			</Text>
			<Tooltip
				label='Norificações'
				placement='right-start'
				closeOnClick
				closeOnScroll
				closeOnPointerDown
			>
				<IconButton
					variant={'ghost'}
					color='white'
					onClick={() => {}}
					aria-label='Notificações'
					icon={<MdNotifications />}
				/>
			</Tooltip>
		</HStack>
	)
}
