import {
	Divider,
	Flex,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	Tooltip
} from '@chakra-ui/react'
import { MdNotifications } from 'react-icons/md'
import { useState } from 'react'
import { useAuth } from '@/app/context/auth'
import { iconByType } from '../atoms/IconByType'
import { IconBase, IconType } from 'react-icons'
import { UserNotification } from '@/app/types'
import { BiSolidDownArrow, BiSolidRightArrow } from 'react-icons/bi'
import { IoClose, IoTimerSharp } from 'react-icons/io5'

export const NotificationsButton = () => {
	const { user } = useAuth()

	return (
		<Menu>
			<Tooltip
				label='Notificações'
				placement='right-start'
				closeOnClick
				closeOnScroll
				closeOnPointerDown
			>
				<MenuButton
					as={IconButton}
					icon={<MdNotifications />}
					fontSize={{ base: '2xl', md: 'xl' }}
					variant={'ghost'}
					color='white'
					_hover={{ bg: 'transparent', color: 'yellow' }}
					_active={{ bg: 'transparent', color: 'yellow' }}
					aria-label='Notificações'
				/>
			</Tooltip>
			<MenuList
				zIndex={100}
				className='overflow-y-auto bg-gray-800'
				bg={'gray.700'}
				w={{ base: '100vw', md: '70vw', lg: '40vw' }}
				h={'85vh'}
				maxH={{ base: '75vh', md: '85vh' }}
				top={{ base: 0, md: 'auto' }}
			>
				<NotificationsGroup
					title='Novas notificações'
					isClosed={false}
					notifications={(user?.notifications ?? []).filter(
						(x) =>
							!x.archivedUntil ||
							new Date(x.archivedUntil) <= new Date()
					)}
				/>
				<NotificationsGroup
					title='Notificações arquivadas'
					isClosed={true}
					notifications={(user?.notifications ?? []).filter(
						(x) =>
							x.archivedUntil &&
							new Date(x.archivedUntil) > new Date()
					)}
				/>
			</MenuList>
		</Menu>
	)
}
const NotificationsGroup = ({
	title,
	isClosed,
	notifications
}: {
	title: string
	isClosed: boolean
	notifications: UserNotification[]
}) => {
	const [_isClosed, setIsClosed] = useState(isClosed)

	return (
		<Flex
			direction={'column'}
			className='relative rounded-xl my-4 pt-4 px-1'
		>
			<Flex
				bg={'gray.700'}
				className='w-full absolute top-0 left-0 px-1 items-center gap-2 -translate-y-1/2 text-white select-none'
				onClick={() => setIsClosed((prev) => !prev)}
			>
				<IconBase className='shrink-0 cursor-pointer'>
					{_isClosed ? <BiSolidRightArrow /> : <BiSolidDownArrow />}
				</IconBase>
				<Text className='shrink-0 text-sm'>{title}</Text>
				<Divider className='' />
			</Flex>
			<Flex direction={'column'} overflowY={'auto'} maxH='full'>
				{!_isClosed &&
					notifications.map((notification, i) => (
						<Notification
							i={i}
							key={notification.id}
							notification={notification}
						/>
					))}
			</Flex>
		</Flex>
	)
}
const Notification = ({
	i,
	notification
}: {
	i: number
	notification: UserNotification
}) => {
	const IconT = iconByType(notification.type)
	return (
		<div className='relative py-0.5'>
			<MenuItem
				className='flex rounded-lg'
				opacity={
					notification?.archivedUntil &&
					new Date(notification.archivedUntil) > new Date()
						? '40%'
						: '100%'
				}
				_hover={{
					opacity:
						notification?.archivedUntil &&
						new Date(notification.archivedUntil) > new Date()
							? '70%'
							: '100%'
				}}
				bg={i % 2 === 0 ? 'gray.800' : 'gray.900'}
			>
				<Flex className='items-center px-2 py-3 gap-2 text-white'>
					<IconBase className='text-2xl flex-shrink-0'>
						<IconT />
					</IconBase>
					<Flex direction={'column'} className='gap-1'>
						<Text className='text-xs italic opacity-50'>
							{new Date(notification.createdAt).toLocaleString(
								'pt-BR',
								{
									dateStyle: 'full',
									timeStyle: 'short'
								}
							)}
						</Text>
						{notification.archivedUntil && (
							<Text className='text-xs italic opacity-50'>
								Arquivado até:{' '}
								{new Date(
									notification.archivedUntil
								).toLocaleString('pt-BR', {
									dateStyle: 'full',
									timeStyle: 'short'
								})}
							</Text>
						)}
						<Text className='text-sm font-bold'>
							{notification.title}
						</Text>
						<Text className='text-sm'>{notification.subtitle}</Text>
						{notification.description && (
							<Text className='text-xs opacity-50'>
								{notification.description}
							</Text>
						)}
					</Flex>
				</Flex>
			</MenuItem>
			<Flex direction='column' className='absolute top-0 right-0 text-lg'>
				<NotificationActionButton
					label='Excluir'
					Icon={IoClose}
					onClick={() => {}}
				/>
				<NotificationActionButton
					label='Arquivar'
					Icon={IoTimerSharp}
					onClick={() => {}}
				/>
			</Flex>
		</div>
	)
}

const NotificationActionButton = ({
	Icon,
	label,
	onClick
}: {
	Icon: IconType
	label: string
	onClick: () => void
}) => {
	return (
		<IconButton
			size='md'
			title={label}
			icon={<IconBase className='text-lg'>{<Icon />}</IconBase>}
			aria-label={label}
			onClick={(e) => {
				e.preventDefault()
				onClick()
			}}
			right={0}
			variant={'ghost'}
			color={'white'}
			_hover={{
				bg: 'transparent',
				color: 'yellow'
			}}
		/>
	)
}
