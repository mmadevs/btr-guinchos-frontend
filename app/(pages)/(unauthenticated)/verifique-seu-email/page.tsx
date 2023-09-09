'use client'
import { Center, Image, Text } from '@chakra-ui/react'

export default function VerifiqueSeuEmail() {
	return (
		<Center className='flex flex-col w-screen h-screen bg-gray-900 text-white text-center'>
			<Image
				bg={'white'}
				className='w-40 p-2 rounded-full'
				src='/company_logo.png'
				alt='Company logo'
			/>
			<Text fontSize={'4xl'}>Verifique seu email!</Text>
			<Text fontSize={'md'}>
				Enviamos um{' '}
				<Text display={'inline'} color={'yellow'}>
					link de confirmação
				</Text>{' '}
				para validar seu email, acesse-o e clique no link que enviamos
				para{' '}
				<Text display={'inline'} color={'yellow'}>
					ativar seu cadastro.
				</Text>{' '}
			</Text>
		</Center>
	)
}
