'use client'
import { Flex } from '@chakra-ui/react'
import { FunctionComponent, ReactNode } from 'react'

const CadastrosLayout: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	return (
		<Flex className='relative w-full max-h-full h-full flex-1 flex-col justify-start'>
			<main
				className='bg-gray-900 w-full h-full min-h-0 flex-1 
                    rounded-xl overflow-auto p-2'
			>
				{children}
			</main>
		</Flex>
	)
}

export default CadastrosLayout
