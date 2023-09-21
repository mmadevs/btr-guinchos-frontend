'use client'

import { useLayoutEffect, useState } from 'react'
import {
	Circle,
	Flex,
	Image,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useToast
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import {
	// Person,
	// Collect,
	// Contract,
	// Place,
	// Service,
	// Storage,
	// Transport,
	Trip
} from '@/app/types'
import { states } from '@/util/data'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import Status from './Status'
// import { IconByType } from '@/app/components/atoms/IconByType'
import { min } from 'date-fns'
import { IconByType } from '@/app/components/atoms/IconByType'
import { IconBase } from 'react-icons'
import { useApi } from '@/app/context/api'
import { FloatButton } from '@/app/components/atoms/FloatButton'

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
			if (!tripsResponse?.ok) return

			const statusesResponse = await api(`app/dashboard/statuses`)
			if (!statusesResponse?.ok) return

			if (tripsResponse?.ok && statusesResponse?.ok) {
				const { trips: _trips } = await tripsResponse.json()
				setTrips(_trips)

				const { statuses: _statuses } = await statusesResponse.json()
				setStatuses(_statuses)
			}
		} catch (err) {
			console.error(err)
			toast({ title: 'Erro!', description: (err as Error).message })
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

	const DateComponent = ({
		date,
		hour = false
	}: {
		date: Date | undefined
		hour?: boolean
	}) => {
		if (!date) return <></>
		const dateString = format(new Date(date), 'dd/MM hh:mm', {
			locale: ptBR
		})
		const data = {
			title: dateString.split(' ')[0],
			description: hour ? dateString.split(' ')[1] : ''
		}
		return <TitleAndDescription data={data} />
	}

	const getNextDeadline = (trip: Trip) => {
		if (trip.status === 'building') return trip.assemblyDeadline
		return min(trip.stops.map((x) => new Date(x.deadline)))
	}
	const getLastUpdate = (trip: Trip) => {
		const date = [...trip.checkpoints]?.pop()?.createdAt ?? trip.createdAt
		return new Date(date)
	}

	const getNameAndLastName = (
		name: string,
		shortLastName: boolean = false
	) => {
		const arr = name.split(' ')
		const firstName = arr[0]
		const lastName =
			arr.length > 1
				? ` ${!shortLastName ? arr.pop() : arr.pop()?.split('')[0]}`
				: ''

		return firstName + lastName
	}

	const getDriver = (trip: Trip) => {
		const { driver } = trip
		return {
			images: driver.imageUrl
				? [{ name: driver.name, src: driver.imageUrl }]
				: [],
			title: getNameAndLastName(driver.name),
			description: driver?.company?.name ?? '(Autônomo)'
		}
	}
	const getVehicle = (trip: Trip) => {
		const { stork } = trip
		return {
			images: stork.brand.imageUrl
				? [
						{
							name: `${stork.brand.name} ${stork.model}`,
							src: stork.brand.imageUrl
						}
				  ]
				: [],
			title: `${stork.brand.name} ${stork.model}`,
			description: `${stork.plate.toLocaleUpperCase()} - ${getNameAndLastName(
				stork.owner.name
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
			.map((x) => ({ name: x.name, src: x.imageUrl as string }))

		return {
			images,
			title:
				clients.length === 1
					? getNameAndLastName(clients[0].name)
					: clients
							.slice(0, 2)
							.map((x) => getNameAndLastName(x.name, true))
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
				const name = `${vehicle.brand.name} ${vehicle.model}`
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
				const name = x.brand.name
				if (!idsMarcas[name]) {
					idsMarcas[name] = true
					return true
				}
				return false
			})
			.map((x) => ({
				name: `${x.brand.name} ${x.model}`,
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

	const TitleAndDescription = ({
		data
	}: {
		data: {
			title: string
			description?: string
			color?: string
			images?: { name: string; src: string }[]
		}
	}) => {
		return (
			<Flex className='items-center gap-1'>
				{data?.images && (
					<Flex className='inline-flex flex-row-reverse [&>*]:inline-block [&>*:not(:last-child)]:-ml-4'>
						{data.images.map((image) => (
							<ImageOrText key={image.name} image={image} />
						))}
					</Flex>
				)}
				<Flex className='flex-col'>
					<Text color={data.color ?? 'white'}>{data.title}</Text>
					{!!data.description && (
						<Text className='text-xs opacity-75'>
							{data.description}
						</Text>
					)}
				</Flex>
			</Flex>
		)
	}

	const ImageOrText = ({
		image
	}: {
		image: { name: string; src: string }
	}) => {
		const [showImage, setShowImage] = useState(true)

		return showImage ? (
			<div
				className='bg-white overflow-hidden w-8 h-8 min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem] 
            rounded-full border-2 border-white'
			>
				<Image
					key={image.src}
					objectFit={'scale-down'}
					className='flex-1 w-full h-full'
					{...image}
					onError={() => setShowImage(false)}
					alt='_'
				/>
			</div>
		) : (
			<AvatarText name={image.name} />
		)
	}

	const AvatarText = ({ name }: { name: string }) => {
		const arr = name.split(' ')
		const firstName = arr[0]
		const lastName = arr.length > 1 ? arr.pop()?.split('')[0] : ''

		return (
			<Circle
				bg={'gray.800'}
				className='w-8 h-8 border-2 border-white'
			>{`${firstName.split('')[0]}${
				lastName ? '' : firstName.split('')[1]
			}`}</Circle>
		)
	}

	return (
		<Flex className='relative w-full max-h-full h-full flex-1 flex-col justify-start'>
			<Status statuses={statuses} />
			<main
				className='bg-gray-900 w-full h-full min-h-0 flex-1 
            rounded-b-xl overflow-auto'
			>
				<TableContainer className='min-h-full h-min w-min pb-12 pr-12'>
					<Table variant={'simple'} colorScheme='blue'>
						<TableCaption>
							Viagens em execução: {trips.length}
						</TableCaption>
						<Thead>
							<Tr>
								<Th title='Status da viagem'>Stt</Th>
								<Th title='Última atualização'>Atualiz.</Th>
								<Th title='Cegonha / Guincho'>Veículo</Th>
								<Th title='Motorista'>Motorista</Th>
								<Th title='Clientes'>Clientes</Th>
								<Th title='Carga transportada'>Carga</Th>
								<Th title='Localização'>Localização</Th>
								<Th title='Próximo destino'>Próximo destino</Th>
								<Th title='Prazo mais próximo'>Prazo</Th>
								<Th title='Data de criação'>Criado em</Th>
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
									<Td title={getStopType(trip).description}>
										<IconBase className='text-2xl'>
											<IconByType
												type={
													trip.status === 'traveling'
														? getStopType(trip)
																.value
														: trip.status
												}
											/>
										</IconBase>
									</Td>
									<Td title='Última atualização'>
										<DateComponent
											date={getLastUpdate(trip)}
											hour
										/>
									</Td>
									<Td title='Cegonha ou guincho'>
										<TitleAndDescription
											data={getVehicle(trip)}
										/>
									</Td>
									<Td title='Motorista'>
										<TitleAndDescription
											data={getDriver(trip)}
										/>
									</Td>
									<Td title='Clientes'>
										<TitleAndDescription
											data={getClients(trip)}
										/>
									</Td>
									<Td title='Carga transportada'>
										<TitleAndDescription
											data={getCharge(trip)}
										/>
									</Td>
									<Td title='Localização atual'>
										<TitleAndDescription
											data={getCheckpointAddress(trip)}
										/>
									</Td>
									<Td title='Próximo destino'>
										<TitleAndDescription
											data={getStopAddress(trip)}
										/>
									</Td>
									<Td title='Prazo'>
										<DateComponent
											date={getNextDeadline(trip)}
										/>
									</Td>
									<Td title='Data de criação da viagem'>
										<DateComponent
											date={trip.createdAt}
											hour
										/>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</main>
			<FloatButton>+</FloatButton>
		</Flex>
	)
}
