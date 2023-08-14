'use client'
import { Center, Text } from '@chakra-ui/react'

export default function VerifiqueSeuEmail() {
	return (
		<Center className='flex flex-col w-screen h-screen bg-gray-900 text-white'>
			<Text fontSize={'4xl'}>Verifique seu email!</Text>
			<Text fontSize={'md'}>
				Enviamos um link de confirmação para validar seu email, acesse-o
				e clique no link que enviamos para ativar seu cadastro.
			</Text>
		</Center>
	)
}
