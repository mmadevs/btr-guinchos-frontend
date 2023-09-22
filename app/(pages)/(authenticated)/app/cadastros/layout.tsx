'use client'
import { Flex, Link } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { FunctionComponent, ReactNode } from 'react'

const CadastrosLayout: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	const pathname = usePathname()
	const registrations = [
		{ title: 'Clientes', route: 'clientes' },
		{ title: 'Endereços', route: 'enderecos' },
		{ title: 'Motoristas', route: 'motoristas' },
		{ title: 'Veículos', route: 'veiculos' },
		{ title: 'Usuários', route: 'usuarios' }
	]
	return (
		<Flex direction={'column'} w={'full'} gap={2}>
			<Flex className='w-full overflow-x-auto gap-4 p-4'>
				{registrations.map((r) => {
					const myHref = `/app/cadastros/${r.route}`
					return (
						<Link
							borderBottom={pathname === myHref ? '4px' : 'none'}
							key={r.route}
							href={myHref}
							className='text-xl md:text-lg'
						>
							{r.title}
						</Link>
					)
				})}
			</Flex>
			<Flex className='relative w-full max-h-full h-full flex-1 flex-col justify-start'>
				<main
					className='bg-gray-900 w-full h-full min-h-0 flex-1 
                    rounded-xl overflow-auto p-2'
				>
					{children}
				</main>
			</Flex>
		</Flex>
	)
}

export default CadastrosLayout
