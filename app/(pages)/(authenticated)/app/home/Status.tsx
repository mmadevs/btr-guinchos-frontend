'use client'

import { Fragment } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { IconBase } from 'react-icons'
import Link from 'next/link'
import { IconByType } from '@/app/components/atoms/IconByType'

export default function Status({
	statuses
}: {
	statuses: {
		type: string
		title: string
		subtitle: string
		value: string
		valueColor: string
		url: string
	}[]
}) {
	return (
		<header className='relative w-full text-white flex flex-col'>
			<div className='bg-gray-900 z-0 absolute top-1/2 w-full h-1/2 rounded-t-xl' />
			<main className='self-center w-[98%] md:w-[80%] z-10 rounded-xl shadow-xl bg-gray-900 border-4 border-gray-950 py-2 px-4'>
				<Flex className='flex-column w-full overflow-x-auto flex-row gap-2'>
					{statuses.map((status, i) => (
						<Fragment key={status.title}>
							{i > 0 && (
								<div className='border-2 border-gray-800 opacity-50' />
							)}
							<Link href={status.url} className='flex-1 px-2'>
								<Flex
									key={status.title}
									className='gap-2 text-center items-center justify-center'
								>
									<IconBase className='hidden md:block text-4xl text-white'>
										{<IconByType type={status.type} />}
									</IconBase>
									<Flex className='py-2 gap-2 items-center justify-center'>
										<div>
											<Text className='flex-1 text-sm md:text-md font-bold'>
												{status.title}
											</Text>
											{status.subtitle && (
												<Text
													className={`whitespace-nowrap text-xs font-italic ${
														status.subtitle
															? ''
															: 'text-transparent'
													}`}
												>
													{status.subtitle ?? '. '}
												</Text>
											)}
										</div>

										<Text
											className={`text-2xl font-bold ${
												status.valueColor === 'green'
													? 'text-green-500'
													: ''
											}`}
										>
											{status.value}
										</Text>
									</Flex>
								</Flex>
							</Link>
						</Fragment>
					))}
				</Flex>
			</main>
		</header>
	)
}
