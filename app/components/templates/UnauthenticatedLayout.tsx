'use client'
import { FunctionComponent, ReactNode } from 'react'
import { ChakraProvider, HStack } from '@chakra-ui/react'

const UnauthenticatedLayout: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	return (
		<ChakraProvider>
			<HStack className=''>{children}</HStack>
		</ChakraProvider>
	)
}

export default UnauthenticatedLayout
