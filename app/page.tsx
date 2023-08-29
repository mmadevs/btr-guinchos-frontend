'use client'

import { extendTheme } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
	const router = useRouter()

	useEffect(() => {
		router.push('/login')
	}, [router])

	return (
		<main className='flex flex-col items-start bg-zinc-900 w-screen h-screen'>
			voce n logou ainda
		</main>
	)
}
