'use client'

import { Contract } from '@/app/types'
import { apiUrl } from '@/infra/api'
import { Flex, Link, List, ListItem, Text, useToast } from '@chakra-ui/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
	const { id } = useParams()
	const [contract, setContract] = useState<Contract | undefined>()
	const toast = useToast()
	const router = useRouter()

	useEffect(() => {
		if (id) {
			loadContractByService()
		}
	}, [id]) //eslint-disable-line

	const loadContractByService = async () => {
		try {
			const response = await fetch(`${apiUrl}/app/contract?service=${id}`)

			if (response.ok) {
				const data = await response.json()
				setContract(data.contract)
			}
		} catch (err) {
			console.error(err)
			toast({
				title: 'Erro!',
				description: 'Erro ao carregar o serviço',
				colorScheme: 'red'
			})
		}
	}

	return (
		<Flex className='w-full max-h-full h-full flex-1 flex-col justify-start'>
			{contract ? (
				<>
					<Text className='text-4xl'>Contrato</Text>
					<Text>Cliente: {contract?.client?.displayName}</Text>

					<List>
						{contract?.services?.map((service) => (
							<ListItem key={service.id}>
								<p>{`${service.vehicle.brand.displayName} ${
									service.vehicle.model
								} ${new Date(
									service.vehicle.madeIn
								)?.getFullYear?.()}`}</p>
							</ListItem>
						))}
					</List>
				</>
			) : (
				<>
					<Text>Falha ao carregar serviço</Text>
					<Link onClick={() => router.back()}>Voltar</Link>
				</>
			)}
		</Flex>
	)
}
