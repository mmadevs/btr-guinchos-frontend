import { FunctionComponent } from 'react'
import { Center } from '@chakra-ui/react'
import { menuButtons } from '@/util/data'
import { MdPerson } from 'react-icons/md'
import { useAuth } from '@/app/context/auth'
import { SidebarButton } from '@/app/components/molecules/SidebarButton'
import { usePathname } from 'next/navigation'

export const Footer: FunctionComponent = () => {
	const { user } = useAuth()
	const pathname = usePathname()
	const userButton = {
		imageUrl: user?.imageUrl,
		icon: MdPerson,
		label: 'Usuário',
		route: `/app/usuario/${user?.id}`
	}
	return (
		<Center as='footer' className='bg-gray-900 w-full p-2 gap-4'>
			{menuButtons.map((button) => (
				<SidebarButton
					key={button.route}
					button={button}
					size='3xl'
					active={pathname.startsWith(button.route)}
				/>
			))}
			<SidebarButton
				button={userButton}
				active={pathname.startsWith(userButton.route)}
				size='3xl'
			/>
		</Center>
	)
}
