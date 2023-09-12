'use client'
import '@/app/globals.css'
import type { Metadata } from 'next'
import { FunctionComponent, ReactNode } from 'react'
import { HStack } from '@chakra-ui/react'

export const metadata: Metadata = {
	title: 'BTR Guinchos',
	description: 'App da BTR Guinchos'
}

const UnauthenticatedLayout: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	return <HStack className=''>{children}</HStack>
}

export default UnauthenticatedLayout
