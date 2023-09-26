'use client'
import { useApi } from '@/app/context/api'
import {
	Flex,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useToast
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Person } from '@/app/types'
import { states } from '@/util/data'
import { MyListItem } from '@/app/components/molecules/MyListItem'
// import { iconByType } from '@/app/components/atoms/IconByType'
import { formatCPForCNPJ } from '@/util/format'

export default function Clientes() {
	const { api } = useApi()
	const toast = useToast()
	const [clients, setClients] = useState<Person[]>([])

	useEffect(() => {
		loadClients()
	}, []) //eslint-disable-line

	const loadClients = async () => {
		try {
			const response = await api('app/clients')
			if (!response?.ok) throw new Error('Falha ao carregar os clientes')
			const { clients: data } = await response.json()
			setClients(data)
		} catch (err) {
			console.error(err)
			toast({
				title: 'Erro!',
				description: (err as Error).message,
				colorScheme: 'red'
			})
		}
	}

	const getClientAddress = (client: Person) => {
		const address =
			client.addresses.find((x) => x.isDefault) || client.addresses[0]

		return {
			title: address?.street,
			description: address
				? `${address.neighbourhood} - ${address.city}, ${states.find(
						(x) => x.name === address?.state
				  )?.UF}`
				: undefined
		}
	}

	return (
		<>
			<Flex className='items-center gap-16'>
				<Text as={'h1'} fontSize={'2xl'}>
					Clientes
				</Text>
			</Flex>
			<TableContainer className='min-h-min h-fit pb-12 pr-12'>
				<Table variant={'unstyled'} colorScheme='blue'>
					<Thead>
						<Tr>
							<Th>Nome</Th>
							<Th>Contato</Th>
							<Th>Endereço</Th>
						</Tr>
					</Thead>
					<Tbody>
						{clients.map((client, i) => (
							<Tr
								key={client.id}
								bg={i % 2 === 0 ? 'transparent' : 'gray.900'}
							>
								<Td>
									<Flex>
										<MyListItem
											data={{
												title: client.displayName,
												description:
													formatCPForCNPJ(client),
												images: [
													{
														name: client.fullName,
														src: client.imageUrl
													}
												]
											}}
										/>
									</Flex>
								</Td>
								<Td>
									{client.phones.find((x) => x.isDefault)
										?.number ?? client.phones[0].number}
								</Td>
								<Td>
									<MyListItem
										data={getClientAddress(client)}
									/>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</>
	)
}
