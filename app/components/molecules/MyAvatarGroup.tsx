import { Flex } from '@chakra-ui/react'
import { MyAvatar } from '@/app/components/atoms/MyAvatar'

export const MyAvatarGroup = ({
	images
}: {
	images: { name: string; src: string | undefined }[]
}) => {
	return (
		<Flex className='inline-flex flex-row-reverse [&>*]:inline-block [&>*:not(:last-child)]:-ml-4'>
			{images.map(({ name, src }) => (
				<MyAvatar key={name} name={name} src={src} />
			))}
		</Flex>
	)
}
