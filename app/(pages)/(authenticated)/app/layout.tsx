'use client'
import '@/app/globals.css'
import type { Metadata } from 'next'

import { FunctionComponent, ReactNode } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Sidebar } from '@/app/components/organisms/Sidebar'
import { Header } from '@/app/components/organisms/Header'
import { Footer } from '@/app/components/organisms/Footer'

export const metadata: Metadata = {
	title: 'BTR Guinchos',
	description: 'App da BTR Guinchos'
}

const AuthenticatedLayout: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	return (
		<Grid
			p={0}
			className='flex flex-col md:grid w-[100svw] h-[100svh] bg-gray-900 grid-cols-[100%] md:grid-cols-[auto_1fr]'
			// templateColumns={{ xs: '1fr', md: 'auto 1fr' }}
			templateRows={'auto 1fr auto'}
		>
			<GridItem className='md:col-start-2 max-w-full min-w-0'>
				<Header />
			</GridItem>
			<GridItem
				rowStart={1}
				rowSpan={2}
				h={'full'}
				className='hidden md:block'
				display={{ xs: 'none', md: 'block' }}
			>
				<Sidebar />
			</GridItem>
			<GridItem className='bg-gray-950 rounded-xl text-white p-2 flex max-w-full max-h-full min-w-0 min-h-0 '>
				{children}
			</GridItem>
			<GridItem className='md:col-start-2 max-w-full min-w-0 md:hidden'>
				<Footer />
			</GridItem>
		</Grid>
	)
	// : (
	// 	<Flex
	// 		flexDirection={'column'}
	// 		justifyContent={'center'}
	// 		alignItems={'center'}
	// 		bg={'gray.900'}
	// 		className='h-[100svh] w-screen'
	// 	>
	// 		<Image
	// 			src='/company_logo.png'
	// 			className='w-48'
	// 			alt='Enterprise Logo'
	// 		/>
	// 		<Text fontSize={'4xl'} className='text-white'>
	// 			Faça login para acessar a aplicação!
	// 		</Text>
	// 		<Link href='/login'>
	// 			<Text fontSize={'xl'} className='text-blue-400 underline'>
	// 				Fazer login
	// 			</Text>
	// 		</Link>
	// 	</Flex>
	// )
}

export default AuthenticatedLayout
