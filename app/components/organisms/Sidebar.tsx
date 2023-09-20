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
import { useAuth } from '../../context/auth'
import { useRouter } from 'next/navigation'
import { menuButtons } from '@/util/data'

export const Sidebar: FunctionComponent = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [imageUrl, setImageUrl] = useState<string | undefined>()

	const { user, logout } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (user?.imageUrl) setImageUrl(user?.imageUrl)
	}, [user])

	return (
		<Fragment>
			<VStack className='bg-gray-900 w-16 p-2 h-screen hidden'>
				<Tooltip
					label='Menu'
					placement='right-end'
					closeOnClick={true}
					closeOnScroll={true}
					closeOnPointerDown={true}
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
					{menuButtons.map((button) => (
						<Tooltip
							key={button.route}
							label={button.label}
							placement='right-end'
						>
							<IconButton
								size={'lg'}
								aria-label={button.label}
								_hover={{ bg: 'transparent', color: 'yellow' }}
								color='white'
								variant={'ghost'}
								icon={<button.icon />}
							/>
						</Tooltip>
					))}
				</VStack>
				<Divider />
				<Button
					p={2}
					bg={'transparent'}
					className='relative w-15 h-15 aspect-square'
				>
					{imageUrl ? (
						<Image
							borderRadius={'full'}
							border={'1px'}
							borderColor={'white'}
							src={imageUrl}
							className='aspect-square'
							alt='User Profile'
							objectFit={'cover'}
							onError={() => setImageUrl(undefined)}
						/>
					) : (
						<IconBase className='text-white text-2xl'>
							<MdPerson />
						</IconBase>
					)}
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
						onClick={() => {
							logout()
							router.push('/login')
						}}
						aria-label='Sair'
						icon={<MdExitToApp />}
					/>
				</Tooltip>
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
							{menuButtons.map((button) => (
								<Button
									key={button.route}
									className='w-full hover:text-black'
									background={'transparent'}
									color={'white'}
								>
									<IconBase className='text-3xl'>
										{<button.icon />}
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
