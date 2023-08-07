import { FunctionComponent, Fragment } from 'react'
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	Container,
	HStack,
	VStack,
	Tooltip,
	Text,
	IconButton,
	Divider,
	Image,
	Center
} from '@chakra-ui/react'
import { useState } from 'react'
import {
	MdAreaChart,
	MdEditDocument,
	MdHome,
	MdMenu,
	MdNotifications,
	MdSettings
} from 'react-icons/md'
import { IconBase } from 'react-icons'

export const Header: FunctionComponent = () => {
	return (
		<HStack
			className='bg-zinc-800 w-16 p-2'
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
