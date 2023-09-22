import { AvatarProps, Circle, Image } from '@chakra-ui/react'
import { useState } from 'react'

export const MyAvatar = ({
	name,
	...rest
}: AvatarProps & {
	name: string
}) => {
	const [showImage, setShowImage] = useState(true)
	const { src } = rest
	// <Avatar
	// 				size={'sm'}
	// 				className={`rounded-full overflow-hidden ${className}`}
	// 				border={'2px'}
	// 				{...commomProps}
	// 			>
	// 				{button.imageUrl && (
	// 					<Image
	// 						src={button.imageUrl}
	// 						alt='Profile'
	// 						onError={() => setShowImage(false)}
	// 					/>
	// 				)}
	// 			</Avatar>
	return showImage ? (
		<div
			className='bg-white overflow-hidden w-8 h-8 min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem] 
        rounded-full border-2 border-white'
		>
			<Image
				key={src}
				objectFit={'scale-down'}
				className='flex-1 w-full h-full'
				src={src}
				onError={() => setShowImage(false)}
				alt={name}
			/>
		</div>
	) : (
		<AvatarText name={name} />
	)
}

const AvatarText = ({ name }: { name: string }) => {
	const arr = name.split(' ')
	const firstName = arr[0]
	const lastName = arr.length > 1 ? arr.pop()?.split('')[0] : ''

	return (
		<Circle bg={'gray.800'} className='w-8 h-8 border-2 border-white'>{`${
			firstName.split('')[0]
		}${lastName ? '' : firstName.split('')[1]}`}</Circle>
	)
}
