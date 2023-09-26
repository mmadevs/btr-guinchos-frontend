'use client'

import { Flex, Image, Text, extendTheme } from '@chakra-ui/react'

extendTheme({
	breakpoints: {
		sm: '320px',
		md: '768px',
		lg: '960px',
		xl: '1200px',
		'2xl': '1536px'
	}
})
export default function Home() {
	return (
		<Flex
			className={`h-[100svh] w-full flex flex-col gap-4 items-center justify-center
        md:bg-gray-800 text-white`}
		>
			<Image
				overflow={'visible'}
				className='w-40 p-4 rounded-full forcedElement'
				src='/company_logo.png'
				alt='Company logo'
			/>
			<Text className='text-4xl'>Sistema BTR Guinchos</Text>
			<Text className='text-md italic'>Carregando...</Text>
		</Flex>
	)
}
