'use client'

import { ReactNode, useLayoutEffect, useState } from 'react'
import {
	Flex,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useToast
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { Trip } from '@/app/types'
import { states } from '@/util/data'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import Status from './Status'
import { min } from 'date-fns'
import { iconByType } from '@/app/components/atoms/IconByType'
import { IconBase } from 'react-icons'
import { useApi } from '@/app/context/api'
import { formatVehicle, getNameAndLastName } from '@/util/format'
import { MyListItem } from '@/app/components/molecules/MyListItem'
import { FaPlus } from 'react-icons/fa'

export default function Home() {
	const router = useRouter()
	const [trips, setTrips] = useState<Trip[]>([])
	const [statuses, setStatuses] = useState<
		{
			type: string
			title: string
			subtitle: string
			value: string
			valueColor: string
			url: string
		}[]
	>([])
	const toast = useToast()
	const { api } = useApi()

	const loadAll = async () => {
		try {
			const tripsResponse = await api(`app/dashboard/trips`)
			if (!tripsResponse?.ok)
				throw new Error('Falha ao carregar as viagens')

			const statusesResponse = await api(`app/dashboard/statuses`)
			if (!statusesResponse?.ok)
				throw new Error('Falha ao carregar os status')

			const { trips: _trips } = await tripsResponse.json()
			setTrips(_trips)

			const { statuses: _statuses } = await statusesResponse.json()
			setStatuses(_statuses)
		} catch (err) {
			console.error(err)
			toast({
				title: 'Erro!',
				description: (err as Error).message,
				colorScheme: 'red'
			})
		}
	}

	useLayoutEffect(() => {
		loadAll()
	}, []) //eslint-disable-line

	const getCheckpointAddress = (trip: Trip) => {
		const address =
			[...trip.checkpoints].pop()?.address ?? trip?.originPoint

		return {
			title: address?.street,
			description: address
				? `${address.neighbourhood} - ${address.city}, ${states.find(
						(x) => x.name === address?.state
				  )?.UF}`
				: undefined
		}
	}
	const getStopAddress = (trip: Trip) => {
		const address = trip.stops.find((stop) => !stop.isDone)?.address

		return {
			title: address?.street ?? '',
			description: address
				? `${address.neighbourhood} - ${address.city}, ${states.find(
						(x) => x.name === address?.state
				  )?.UF}`
				: undefined
		}
	}
	const getStopType = (trip: Trip) => {
		const type = trip.stops.find((stop) => !stop.isDone)?.type

		const value = (type ?? 'travel') + 'ing'
		return {
			value,
			description:
				value === 'collecting'
					? 'Coletando veículo(s)...'
					: value === 'transporting'
					? 'Levando veículo(s)...'
					: 'Viajando...'
		}
	}

	const getDate = (date: Date, hour = false) => {
		const dateString = format(new Date(date), 'dd/MM hh:mm', {
			locale: ptBR
		})
		return {
			title: dateString.split(' ')[0],
			description: hour ? dateString.split(' ')[1] : ''
		}
	}

	const getNextDeadline = (trip: Trip) => {
		if (trip.status === 'building') return trip.assemblyDeadline
		return min(trip.stops.map((x) => new Date(x.deadline)))
	}
	const getLastUpdate = (trip: Trip) => {
		const date = [...trip.checkpoints]?.pop()?.createdAt ?? trip.createdAt
		return new Date(date)
	}

	const getDriver = (trip: Trip) => {
		const { driver } = trip
		return {
			images: driver.imageUrl
				? [{ name: driver.fullName, src: driver.imageUrl }]
				: [],
			title: getNameAndLastName(driver.displayName),
			description: driver?.company?.displayName ?? '(Autônomo)'
		}
	}
	const getVehicle = (trip: Trip) => {
		const { stork } = trip
		console.log(stork)
		return {
			images: stork.brand.imageUrl
				? [
						{
							name: `${stork.brand.displayName} ${stork.model}`,
							src: stork.brand.imageUrl
						}
				  ]
				: [],
			title: `${stork.brand.displayName} ${stork.model}`,
			description: `${stork.plate.toLocaleUpperCase()} - ${getNameAndLastName(
				stork.owner.displayName
			)}`
		}
	}
	const getClients = (trip: Trip) => {
		const ids: Record<string, boolean> = {}
		const clients = trip.stops
			.map((stop) => stop.client)
			.filter((client) => {
				if (!ids[client.id]) {
					ids[client.id] = true
					return true
				}
				return false
			})
		const images = clients
			.filter((x) => !!x.imageUrl)
			.map((x) => ({ name: x.fullName, src: x.imageUrl as string }))

		return {
			images,
			title:
				clients.length === 1
					? getNameAndLastName(clients[0].displayName)
					: clients
							.slice(0, 2)
							.map((x) => getNameAndLastName(x.displayName, true))
							.join(', '),
			description:
				clients.length > 2 ? `E mais ${clients.length - 2}` : ''
		}
	}
	const getCharge = (trip: Trip) => {
		const idsVeiculos: Record<string, boolean> = {}
		const vehicles = trip.stops
			.map((stop) => stop.vehicle)
			.filter((vehicle) => {
				const name = `${vehicle.brand.displayName} ${vehicle.model}`
				if (!idsVeiculos[name]) {
					idsVeiculos[name] = true
					return true
				}
				return false
			})
		const idsMarcas: Record<string, boolean> = {}
		const images = vehicles
			.filter((x) => !!x.brand.imageUrl)
			.filter((x) => {
				const name = x.brand.displayName
				if (!idsMarcas[name]) {
					idsMarcas[name] = true
					return true
				}
				return false
			})
			.map((x) => ({
				name: formatVehicle(x),
				src: x.brand.imageUrl as string
			}))
		const maximumViewed = 3
		return {
			images,
			title: vehicles
				.slice(0, maximumViewed)
				.map((x) => x.model)
				.join(', '),
			description:
				vehicles.length > maximumViewed
					? `E mais ${vehicles.length - maximumViewed}`
					: ''
		}
	}

	const IconT = ({ trip }: { trip: Trip }) => {
		const Icon = iconByType(
			trip.status === 'traveling' ? getStopType(trip).value : trip.status
		)
		return <Icon />
	}

	const tableData: ((trip?: Trip) => {
		headerTitle: string
		childrenTitle?: string
		label: string
		children?: ReactNode | JSX.Element | string | undefined
	})[] = [
		(trip?: Trip) => ({
			headerTitle: 'Status da viagem',
			childrenTitle: trip && getStopType(trip).description,
			label: 'Stt',
			children: trip && (
				<IconBase className='text-2xl'>
					<IconT trip={trip} />
				</IconBase>
			)
		}),
		(trip?: Trip) => ({
			headerTitle: 'Última atualização',
			label: 'Atualz.',
			children: trip && (
				<MyListItem data={getDate(getLastUpdate(trip), true)} />
			)
		}),
		(trip?: Trip) => ({
			headerTitle: 'Cegonha / Guincho',
			label: 'Veículo',
			children: trip && <MyListItem data={getVehicle(trip)} />
		}),
		(trip?: Trip) => ({
			headerTitle: 'Motorista',
			label: 'Motorista',
			children: trip && <MyListItem data={getDriver(trip)} />
		}),
		(trip?: Trip) => ({
			headerTitle: 'Clientes',
			label: 'Clientes',
			children: trip && <MyListItem data={getClients(trip)} />
		}),
		(trip?: Trip) => ({
			headerTitle: 'Carga transportada',
			label: 'Carga transportada',
			children: trip && <MyListItem data={getCharge(trip)} />
		}),
		(trip?: Trip) => ({
			headerTitle: 'Localização',
			label: 'Localização',
			children: trip && <MyListItem data={getCheckpointAddress(trip)} />
		}),
		(trip?: Trip) => ({
			headerTitle: 'Próximo destino',
			label: 'Próximo destino',
			children: trip && <MyListItem data={getStopAddress(trip)} />
		}),
		(trip?: Trip) => ({
			headerTitle: 'Prazo mais próximo',
			label: 'Prazo',
			children: trip && (
				<MyListItem data={getDate(getNextDeadline(trip))} />
			)
		}),
		(trip?: Trip) => ({
			headerTitle: 'Data de criação',
			label: 'Criado em',
			children: trip && <MyListItem data={getDate(trip.createdAt)} />
		})
	]

	const newOptions = [
		{ label: 'Montar viagem', icon: iconByType('transport') },
		{ label: 'Novo contrato', icon: iconByType('contract') },
		{ label: 'Fazer orçamento', icon: iconByType('budget') }
	]
	return (
		<Flex className='relative w-full max-h-full h-full flex-1 flex-col justify-start'>
			<Status statuses={statuses} />
			<main
				className='bg-gray-900 w-full h-full min-h-0 flex-1 
            rounded-b-xl overflow-auto'
			>
				<TableContainer className='min-h-full h-min w-min pb-12 pr-12'>
					<Table variant={'unstyled'} colorScheme='blue'>
						<TableCaption>
							Viagens em execução: {trips.length}
						</TableCaption>
						<Thead>
							<Tr>
								{tableData.map((th) => {
									const data = th()
									return (
										<Th
											key={data.label}
											title={data.headerTitle}
										>
											{data.label}
										</Th>
									)
								})}
							</Tr>
						</Thead>
						<Tbody>
							{[
								...trips,
								...trips,
								...trips,
								...trips,
								...trips,
								...trips,
								...trips,
								...trips,
								...trips,
								...trips,
								...trips,
								...trips,
								...trips
							].map((trip, i) => (
								<Tr
									key={trip.id}
									cursor={'pointer'}
									_hover={{ bg: 'whiteAlpha.100' }}
									bg={
										i % 2 === 0 ? 'transparent' : 'gray.900'
									}
									onClick={() =>
										router.push(`/app/trip/${trip.id}`)
									}
								>
									{tableData.map((td) => {
										const data = td(trip)
										return (
											<Td
												key={`data-${data.label}`}
												title={
													data.childrenTitle ??
													data.headerTitle
												}
											>
												{data.children}
											</Td>
										)
									})}
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</main>

			<Menu>
				<MenuButton
					size={'lg'}
					as={IconButton}
					shadow={'lg'}
					opacity={'60%'}
					_hover={{ opacity: '90%' }}
					_active={{ opacity: '90%' }}
					bottom={10}
					right={10}
					icon={<FaPlus />}
					position={'absolute'}
					rounded={'full'}
				/>

				<MenuList
					zIndex={100}
					className='overflow-y-auto bg-gray-800'
					bg={'gray.700'}
					w={'250px'}
				>
					{newOptions.map((option) => (
						<MenuItem
							key={option.label}
							bg='transparent'
							_hover={{ bg: 'gray.800' }}
							icon={
								<IconBase className='text-2xl'>
									<option.icon />
								</IconBase>
							}
						>
							{option.label}
						</MenuItem>
					))}
				</MenuList>
			</Menu>
		</Flex>
	)
}
