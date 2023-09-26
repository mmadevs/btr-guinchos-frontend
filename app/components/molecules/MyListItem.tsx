import { Flex, Text } from '@chakra-ui/react'
import { MyAvatarGroup } from './MyAvatarGroup'

export const MyListItem = ({
	data
}: {
	data: {
		title: string
		description?: string
		color?: string
		images?: { name: string; src: string | undefined }[]
	}
}) => {
	return (
		<Flex className='items-center gap-1'>
			{data?.images && <MyAvatarGroup images={data.images} />}
			<Flex className='flex-col'>
				<Text color={data.color ?? 'white'}>{data.title}</Text>
				{!!data.description && (
					<Text className='text-xs opacity-75'>
						{data.description}
					</Text>
				)}
			</Flex>
		</Flex>
	)
}
