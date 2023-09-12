'use client'

import { Flex, Image, Text, extendTheme } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAuth } from './context/auth'
import { useRouter } from 'next/navigation'

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
	const { user } = useAuth()
	const router = useRouter()
	useEffect(() => {
		if (user) {
			router.push('/app/home')
		} else {
			router.push('/login')
		}
	}, []) //eslint-disable-line
	return (
		<Flex
			className={`h-[100svh] w-full flex flex-col gap-4 items-center justify-center
        md:bg-gray-800 text-white`}
		>
			<Image
				overflow={'visible'}
				className='w-40 p-4 md:rounded-full forcedElement'
				src='/company_logo.png'
				alt='Company logo'
			/>
			<Text className='text-4xl'>Sistema BTR Guinchos</Text>
			<Text className='text-md italic'>Carregando...</Text>
		</Flex>
	)
}
