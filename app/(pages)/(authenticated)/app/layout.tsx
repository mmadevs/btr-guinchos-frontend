'use client'
import '@/app/globals.css'
import type { Metadata } from 'next'

import { FunctionComponent, ReactNode } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Sidebar } from '@/app/components/Sidebar'
import { Header } from '@/app/components/Header'

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
			className='w-[100svw] h-[100svh] bg-gray-900'
			templateColumns={'auto 1fr'}
			templateRows={'auto 1fr'}
		>
			<GridItem colStart={2}>
				<Header />
			</GridItem>
			<GridItem rowStart={1} rowSpan={2} h={'full'}>
				<Sidebar />
			</GridItem>
			<GridItem className='bg-gray-950 rounded-xl text-white p-2 flex max-w-full max-h-full min-w-0 min-h-0 '>
				{children}
			</GridItem>
		</Grid>
	)

	// (
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
