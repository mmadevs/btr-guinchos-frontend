'use client'
import { FunctionComponent, ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
// import AuthenticatedLayout from '@/app/components/templates/AuthenticatedLayout'
// import UnauthenticatedLayout from '@/app/components/templates/UnauthenticatedLayout'
import { AuthProvider } from '@/app/context/auth'

const Providers: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	return (
		<ChakraProvider>
			<AuthProvider>
				<>{children}</>
			</AuthProvider>
		</ChakraProvider>
	)
}

// const AppLayout2: FunctionComponent<{ children: ReactNode }> = ({
// 	children
// }) => {
// 	const { data: session } = useSession()

// 	return (
// 		<>
// 			{session?.user ? (
// 				<AuthenticatedLayout>{children}</AuthenticatedLayout>
// 			) : (
// 				<UnauthenticatedLayout>{children}</UnauthenticatedLayout>
// 			)}
// 		</>
// 	)
// }

export default Providers
