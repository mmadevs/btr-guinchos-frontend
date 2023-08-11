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
	VStack,
	Tooltip,
	Text,
	IconButton,
	Divider,
	Image,
	Center,
	Menu,
	MenuButton,
	MenuList
} from '@chakra-ui/react'
import { useState } from 'react'
import {
	MdAreaChart,
	MdEditDocument,
	MdHome,
	MdMenu,
	MdSettings
} from 'react-icons/md'
import { IconBase } from 'react-icons'

export const Sidebar: FunctionComponent = () => {
	const [isOpen, setIsOpen] = useState(false)

	const buttons = [
		{ label: 'Início', icon: <MdHome />, route: 'home' },
		{ label: 'Cadastros', icon: <MdEditDocument />, route: 'cadastros' },
		{ label: 'Relatórios', icon: <MdAreaChart />, route: 'relatorios' },
		{ label: 'Ajustes', icon: <MdSettings />, route: 'ajustes' }
	]

	return (
		<Fragment>
			<VStack className='bg-zinc-800 w-16 p-2 h-screen'>
				<Tooltip
					label='Menu'
					placement='right-end'
					closeOnClick
					closeOnScroll
					closeOnPointerDown
				>
					<IconButton
						variant={'ghost'}
						color='white'
						onClick={() => setIsOpen(true)}
						aria-label='Menu'
						icon={<MdMenu />}
					/>
				</Tooltip>
				<Image
					src='/company_logo.png'
					boxSize={'50px'}
					alt='Company logo'
				/>
				<Divider />
				<VStack className='py-5 flex-1'>
					{buttons.map((button) => (
						<Tooltip
							key={button.route}
							label={button.label}
							placement='right-end'
						>
							<IconButton
								aria-label={button.label}
								icon={button.icon}
							/>
						</Tooltip>
					))}
				</VStack>
				<Divider />
				<Button p={2} bg={'transparent'}>
					<Image
						borderRadius={'full'}
						border={'1px'}
						borderColor={'white'}
						src='https://bit.ly/dan-abramov'
						alt='User Profile'
					/>
				</Button>
			</VStack>
			<Drawer
				placement='left'
				isOpen={isOpen}
				onClose={() => {
					setIsOpen(false)
				}}
			>
				<DrawerOverlay />
				<DrawerContent
					background={'blackAlpha'}
					className='bg-zinc-800'
				>
					<DrawerCloseButton color={'white'} />
					<DrawerHeader color={'white'}>
						<Center gap={4}>
							<Image
								src='/company_logo.png'
								boxSize={'50px'}
								alt='Company logo'
							/>
							<Text fontSize={'md'}>BTR Guinchos</Text>
						</Center>
					</DrawerHeader>
					<Divider />
					<DrawerBody>
						<VStack className='py-5'>
							{buttons.map((button) => (
								<Menu key={button.route}>
									<MenuButton
										className='w-full hover:text-black'
										background={'transparent'}
										color={'white'}
									>
										<IconBase className='text-3xl'>
											{button.icon}
										</IconBase>
										<Text flex={1}>{button.label}</Text>
									</MenuButton>
									<MenuList></MenuList>
								</Menu>
							))}
						</VStack>
					</DrawerBody>
					<Divider />
					<DrawerFooter>
						<Button w={'full'} className='flex gap-4'>
							<Image
								borderRadius={'full'}
								boxSize={'30px'}
								borderColor={'white'}
								src='https://bit.ly/dan-abramov'
								alt='User Profile'
							/>
							<Text>Dan abramovic</Text>
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Fragment>
	)
}
