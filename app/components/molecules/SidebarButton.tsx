import { useAuth } from '@/app/context/auth'
import { Permissions } from '@/app/types'
import { MenuItem } from '@/util/data'
import {
	Avatar,
	Flex,
	IconButton,
	Image,
	Menu,
	MenuButton,
	MenuList,
	PlacementWithLogical,
	Text,
	Tooltip,
	VStack
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const SidebarButton = ({
	button,
	size = 'lg',
	showText = false,
	active = false,
	tooltipPlacement = 'right-end',
	className = '',
	hideOn = { base: false, md: false }
}: {
	button: MenuItem
	className?: string
	active?: boolean
	showText?: boolean
	size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
	hideOn?: { base: boolean; md: boolean }
	tooltipPlacement?: PlacementWithLogical
}) => {
	const [showImage, setShowImage] = useState(true)
	const { user } = useAuth()
	const router = useRouter()
	const commonProps = {
		color: active ? 'yellow' : 'white',
		variant: 'ghost',
		cursor: 'pointer',
		fontSize: showText ? { base: '2xl', md: size } : size,
		display: {
			base: hideOn.base ? 'none' : 'inherit',
			md: hideOn.md ? 'none' : 'inherit'
		},
		_hover: { bg: 'transparent', color: 'yellow' },
		'aria-label': button.label,
		onClick: () => {
			if (button.subItems) {
				// router.push(button.route)
			} else if (button.route) {
				router.push(button.route)
			} else if (button.onClick) {
				button.onClick()
			}
		}
	}

	const isAllowed = (requiredPermission: string | undefined) => {
		if (!requiredPermission) return true
		if (!user?.permissions) return false
		if (
			Object.hasOwn(user.permissions, requiredPermission) &&
			user.permissions[requiredPermission as keyof Permissions]
		)
			return true

		return false
	}
	return (
		<Menu>
			<Tooltip
				label={button.label}
				placement={tooltipPlacement}
				closeOnClick
				closeOnScroll
				closeOnPointerDown
			>
				<MenuButton
					as={
						showImage && button.imageUrl
							? Avatar
							: // : showText
							  // ? Button
							  IconButton
					}
					size={'sm'}
					icon={
						(showImage && button.imageUrl) ||
						showText ? undefined : (
							<button.icon />
						)
					}
					_active={{ bg: 'transparent', color: 'yellow' }}
					border={showImage && button.imageUrl ? '2px' : undefined}
					className={
						isAllowed(button.permission)
							? showImage && button.imageUrl
								? `rounded-full overflow-hidden ${className}`
								: showText
								? `w-full flex text-left p-4 items-start ${className}`
								: `text-left ${className}`
							: 'hidden'
					}
					{...commonProps}
				>
					{showImage && button.imageUrl && (
						<Image
							src={button.imageUrl}
							alt='Profile'
							onError={() => setShowImage(false)}
						/>
					)}
					{showText && (
						<Flex
							className={`gap-2 items-center p-2 ${
								showText ? 'w-full' : ''
							}`}
						>
							<button.icon />
							<Text>{button.label}</Text>
							<div className='flex-1'></div>
						</Flex>
					)}
				</MenuButton>
			</Tooltip>
			{button.subItems && (
				<MenuList
					className='z-50 overflow-y-auto bg-gray-800'
					bg={'gray.700'}
				>
					<VStack spacing={{ base: 4, md: 0 }}>
						{button.subItems.map((sub) => (
							<SidebarButton
								key={sub.route}
								showText={true}
								button={{
									...sub,
									route: `${button.route}${sub.route}`
								}}
							/>
						))}
					</VStack>
				</MenuList>
			)}
		</Menu>
	)
}
