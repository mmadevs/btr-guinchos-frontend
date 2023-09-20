import { FunctionComponent, useState } from 'react'
import { Tooltip, IconButton, Center, Image, Avatar } from '@chakra-ui/react'
import { menuButtons } from '@/util/data'
import { IconType } from 'react-icons'
import { MdPerson } from 'react-icons/md'
import { useAuth } from '@/app/context/auth'

export const Footer: FunctionComponent = () => {
	const { user } = useAuth()
	return (
		<Center as='footer' className='bg-gray-900 w-full p-2 gap-4'>
			{menuButtons.map((button) => (
				<MenuButton key={button.route} button={button} size='3xl' />
			))}
			<MenuButton
				button={{
					imageUrl: user?.imageUrl,
					icon: MdPerson,
					label: 'Usuário',
					route: ''
				}}
				size='3xl'
			/>
		</Center>
	)
}

const MenuButton = ({
	button,
	size = 'lg'
}: {
	button: {
		imageUrl?: string
		route: string
		label: string
		icon: IconType
	}
	size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}) => {
	const [showImage, setShowImage] = useState(true)
	return (
		<Tooltip label={button.label} placement='right-end'>
			{showImage && button.imageUrl ? (
				<Avatar
					size={'sm'}
					aria-label={button.label}
					_hover={{ bg: 'transparent', color: 'yellow' }}
					color='white'
					variant={'ghost'}
					className='rounded-full overflow-hidden'
					border={'2px'}
					fontSize={size}
				>
					{button.imageUrl && (
						<Image
							src={button.imageUrl}
							alt='Profile'
							onError={() => setShowImage(false)}
						/>
					)}
				</Avatar>
			) : (
				<IconButton
					size={'lg'}
					aria-label={button.label}
					_hover={{ bg: 'transparent', color: 'yellow' }}
					color='white'
					variant={'ghost'}
					fontSize={size}
					icon={<button.icon />}
				/>
			)}
		</Tooltip>
	)
}
