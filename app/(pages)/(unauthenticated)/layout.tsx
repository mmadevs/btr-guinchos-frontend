'use client'
import { FunctionComponent, ReactNode } from 'react'
import { HStack } from '@chakra-ui/react'

const UnauthenticatedLayout: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	return <HStack className=''>{children}</HStack>
}

export default UnauthenticatedLayout
