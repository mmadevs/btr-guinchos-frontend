import {
	Avatar,
	IconButton,
	Image,
	PlacementWithLogical,
	Tooltip
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IconType } from 'react-icons'

export const SidebarButton = ({
	button,
	size = 'lg',
	active = false,
	tooltipPlacement = 'right-end',
	className = '',
	hideOn = { base: false, md: false }
}: {
	button: {
		imageUrl?: string
		route?: string
		label: string
		icon: IconType
		onClick?: () => void
	}
	className?: string
	active?: boolean
	size?: 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
	hideOn?: { base: boolean; md: boolean }
	tooltipPlacement?: PlacementWithLogical
}) => {
	const [showImage, setShowImage] = useState(true)
	const router = useRouter()
	const commomProps = {
		color: active ? 'yellow' : 'white',
		variant: 'ghost',
		cursor: 'pointer',
		fontSize: size,
		display: {
			base: hideOn.base ? 'none' : 'inherit',
			md: hideOn.md ? 'none' : 'inherit'
		},
		_hover: { bg: 'transparent', color: 'yellow' },
		'aria-label': button.label,
		onClick: () => {
			if (button.route) {
				router.push(button.route)
			} else if (button.onClick) {
				button.onClick()
			}
		}
	}
	return (
		<Tooltip
			label={button.label}
			placement={tooltipPlacement}
			closeOnClick
			closeOnScroll
			closeOnPointerDown
		>
			{showImage && button.imageUrl ? (
				<Avatar
					size={'sm'}
					className={`rounded-full overflow-hidden ${className}`}
					border={'2px'}
					{...commomProps}
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
					icon={<button.icon />}
					{...commomProps}
				/>
			)}
		</Tooltip>
	)
}
