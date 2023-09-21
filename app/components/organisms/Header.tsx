import { FunctionComponent } from 'react'
import { Text, Image, Flex } from '@chakra-ui/react'
import { NotificationsButton } from '../molecules/NotificationsButton'
import { SidebarButton } from '../molecules/SidebarButton'
import { MdExitToApp } from 'react-icons/md'
import { useAuth } from '@/app/context/auth'

export const Header: FunctionComponent = () => {
	const { logout } = useAuth()
	return (
		<Flex
			as={'header'}
			className='bg-gray-900 p-2 px-4'
			w={'full'}
			bg={'blackAlpha'}
			align={'center'}
			justify={'space-between'}
		>
			<SidebarButton
				hideOn={{ base: false, md: true }}
				button={{
					icon: MdExitToApp,
					label: 'Sair',
					onClick: logout
				}}
				size='xl'
			/>
			<Flex className='flex-1 md:flex-0 gap-2 items-center justify-center md:justify-start'>
				<Image
					className='block md:hidden'
					src='/company_logo.png'
					boxSize={'50px'}
					alt='Company logo'
				/>
				<Text
					className='text-center'
					fontSize={{ base: '2xl', md: 'xl' }}
					color={'white'}
				>
					BTR Guinchos
				</Text>
			</Flex>
			<NotificationsButton />
		</Flex>
	)
}
