'use client'
import { FunctionComponent, ReactNode } from 'react'
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react'
import { Sidebar } from '@/app/components/Sidebar'
import { Header } from '@/app/components/Header'

const InsideLayout: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	return (
		<ChakraProvider>
			<Grid
				p={0}
				className='max-h-screen w-screen'
				templateColumns={'auto 1fr'}
				templateRows={'auto 1fr'}
			>
				<GridItem colStart={2}>
					<Header />
				</GridItem>
				<GridItem rowStart={1} rowSpan={2} h={'full'}>
					<Sidebar />
				</GridItem>
				<GridItem>{children}</GridItem>
			</Grid>
		</ChakraProvider>
	)
}

export default InsideLayout
