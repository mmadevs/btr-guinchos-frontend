'use client'
import { FunctionComponent, ReactNode } from 'react'
import { ChakraProvider, Grid, GridItem, HStack } from '@chakra-ui/react'
import { Sidebar } from '@/app/components/Sidebar'
import { Header } from '@/app/components/Header'

const UnauthenticatedLayout: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	return (
		<ChakraProvider>
			<HStack className='fixed inset-0'>{children}</HStack>
		</ChakraProvider>
	)
}

export default UnauthenticatedLayout
