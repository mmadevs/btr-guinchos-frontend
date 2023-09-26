import { FunctionComponent, Fragment, useEffect } from 'react'
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
	Center
	// Menu,
	// MenuButton,
	// MenuList
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdExitToApp, MdMenu, MdPerson } from 'react-icons/md'
import { IconBase } from 'react-icons'
import { useAuth } from '@/app/context/auth'
import { usePathname, useRouter } from 'next/navigation'
import { MenuItem, menuItems } from '@/util/data'
import { SidebarButton } from '@/app/components/molecules/SidebarButton'

export const Sidebar: FunctionComponent = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [imageUrl, setImageUrl] = useState<string | undefined>()

	const { user, logout } = useAuth()
	const router = useRouter()
	const pathname = usePathname()

	const userButton: MenuItem = {
		imageUrl: imageUrl,
		icon: MdPerson,
		label: user?.name ?? 'Usuário',
		route: `/app/usuario/${user?.id}`
	}
	useEffect(() => {
		if (user?.imageUrl) setImageUrl(user?.imageUrl)
	}, [user])

	return (
		<Fragment>
			<VStack className='bg-gray-900 w-16 p-2 py-4 h-screen hidden'>
				<VStack spacing={4}>
					<SidebarButton
						button={{
							icon: MdMenu,
							label: 'Menu',
							onClick: () => setIsOpen(true)
						}}
						size='2xl'
					/>
					<Image
						src='/company_logo.png'
						boxSize={'50px'}
						alt='Company logo'
					/>
				</VStack>
				<Divider />
				<VStack spacing={6} className='py-5 flex-1 '>
					{menuItems.map((button) => (
						<SidebarButton
							key={button.route}
							active={
								!!button?.route &&
								pathname.startsWith(button.route)
							}
							button={button}
							size='2xl'
						/>
					))}
				</VStack>
				<Divider />
				<VStack spacing={4}>
					<SidebarButton
						button={userButton}
						active={
							!!userButton?.route &&
							pathname.startsWith(userButton.route)
						}
						size='2xl'
					/>
					<SidebarButton
						button={{
							icon: MdExitToApp,
							label: 'Sair',
							onClick: logout
						}}
						size='2xl'
					/>
				</VStack>
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
					className='bg-gray-900'
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
							{menuItems.map((button) => (
								<Button
									key={button.route}
									className='w-full hover:text-black'
									background={'transparent'}
									color={'white'}
								>
									<IconBase className='text-3xl'>
										<>{button.icon}</>
									</IconBase>
									<Text flex={1}>{button.label}</Text>
								</Button>
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
								src={user?.imageUrl}
								alt='User Profile'
							/>
							<Text>{user?.name}</Text>
						</Button>
						<Tooltip
							label='Sair'
							placement='right-end'
							closeOnClick={true}
							closeOnScroll={true}
							closeOnPointerDown={true}
						>
							<IconButton
								variant={'ghost'}
								color='white'
								_hover={{ bg: 'transparent', color: 'yellow' }}
								onClick={() => {
									logout()
									router.push('/login')
								}}
								aria-label='Sair'
								icon={<MdExitToApp />}
							/>
						</Tooltip>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Fragment>
	)
}
