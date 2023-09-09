'use client'
import { FunctionComponent, ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider, useSession } from 'next-auth/react'
import AuthenticatedLayout from '@/app/components/templates/AuthenticatedLayout'
import UnauthenticatedLayout from '@/app/components/templates/UnauthenticatedLayout'

const AppLayout: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	return (
		<ChakraProvider>
			<SessionProvider>
				<AppLayout2>{children}</AppLayout2>
			</SessionProvider>
		</ChakraProvider>
	)
}

const AppLayout2: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	const { data: session } = useSession()

	return (
		<>
			{session?.user ? (
				<AuthenticatedLayout>{children}</AuthenticatedLayout>
			) : (
				<UnauthenticatedLayout>{children}</UnauthenticatedLayout>
			)}
		</>
	)
}

export default AppLayout
