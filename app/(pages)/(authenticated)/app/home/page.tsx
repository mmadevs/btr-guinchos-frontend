'use client'

import { Fragment, useEffect } from 'react'
import { getCookies } from 'cookies-next'
import {
	Flex,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr
} from '@chakra-ui/react'
import { FaHands, FaQuestion } from 'react-icons/fa'
import { GiTowTruck, GiHandTruck } from 'react-icons/gi'
import { BiSolidCarGarage } from 'react-icons/bi'
import { MdOutlineCurrencyExchange } from 'react-icons/md'
import { IconBase } from 'react-icons'
import Link from 'next/link'

export default function Home() {
	useEffect(() => {
		const cookie = getCookies()
		console.log(cookie)
	}, [])

	const services = [
		{
			id: '62sa6f262sa262ads',
			type: 'Coleta',
			client: 'Carlos Augusto',
			inCharge: 'Marcelo Feijó',
			vehicle: 'Fiat Uno 2016',
			lastCheckpoint: '02/09 - Parque Ibirapuera, Ibirapurera, São Paulo'
		},
		{
			id: '85a1sd1as6515v1ds5',
			type: 'Transporte',
			client: 'Maria José',
			inCharge: 'Cézar Sampaio',
			vehicle: 'Saveiro Cross 2019',
			lastCheckpoint:
				'31/08 - Ladeira do Jardim Zoológico, Ondina, Salvador'
		},
		{
			id: 'as651sa6511c5151sda',
			type: 'Transporte',
			client: 'Pedro Paulo',
			inCharge: 'Lucas De Jesus (JR Trans)',
			vehicle: 'Fiat Palio 1999',
			lastCheckpoint: '31/08 - Rua Madre Tereza, Caixa Dagua, Pernambuco'
		},
		{
			id: '25adsa1s5d15sa5d1',
			type: 'Entrega',
			client: 'Luisa Silva',
			inCharge: 'Paulo Fernandes',
			vehicle: 'Toyota Corolla 2020',
			lastCheckpoint: '05/09 - Av. Paulista, Bela Vista, São Paulo'
		},
		{
			id: '15as1d5sa15d1sa5d',
			type: 'Coleta',
			client: 'João Oliveira',
			inCharge: 'Mariana Santos',
			vehicle: 'Honda Civic 2018',
			lastCheckpoint: '06/09 - Rua dos Andradas, Centro, Porto Alegre'
		},
		{
			id: 'a1s51da5s1da5sda5',
			type: 'Transporte',
			client: 'Mariano Pereira',
			inCharge: 'Isabela Garcia',
			vehicle: 'Volkswagen Gol 2015',
			lastCheckpoint:
				'04/09 - Av. Presidente Vargas, Centro, Rio de Janeiro'
		},
		{
			id: 'asd5a1s5d15sa1d5sa',
			type: 'Entrega',
			client: 'Fernanda Santos',
			inCharge: 'Ricardo Oliveira',
			vehicle: 'Renault Duster 2017',
			lastCheckpoint: '03/09 - Rua da Consolação, Consolação, São Paulo'
		},
		{
			id: 'asd5as15d15d1s5d1',
			type: 'Coleta',
			client: 'Ana Paula',
			inCharge: 'Marcos Fernandes',
			vehicle: 'Ford Fiesta 2019',
			lastCheckpoint: '07/09 - Parque do Ibirapuera, São Paulo'
		},
		{
			id: 'asd1sa5d1as5d1as5d',
			type: 'Transporte',
			client: 'Eduardo Souza',
			inCharge: 'Larissa Rodrigues',
			vehicle: 'Chevrolet Onix 2017',
			lastCheckpoint: '02/09 - Rua Augusta, Consolação, São Paulo'
		},
		{
			id: 'as1d5sa15d1sa5d15a',
			type: 'Entrega',
			client: 'Paulo Roberto',
			inCharge: 'Camila Oliveira',
			vehicle: 'Hyundai Elantra 2021',
			lastCheckpoint: '08/09 - Praia de Copacabana, Rio de Janeiro'
		},
		{
			id: 'as5d15sa15d1sa5d1as',
			type: 'Coleta',
			client: 'Silvia Santos',
			inCharge: 'Rogério Silva',
			vehicle: 'Nissan Sentra 2016',
			lastCheckpoint: '09/09 - Av. Sete de Setembro, Salvador'
		},
		{
			id: '1sa5d1as5d1as5d1as',
			type: 'Transporte',
			client: 'Ricardo Pereira',
			inCharge: 'Luisa Garcia',
			vehicle: 'Toyota Camry 2019',
			lastCheckpoint: '05/09 - Praça da Sé, São Paulo'
		},
		{
			id: 'as5d1as5d1sa5d1sa5d',
			type: 'Entrega',
			client: 'Maria Fernanda',
			inCharge: 'Gabriel Oliveira',
			vehicle: 'Honda Fit 2020',
			lastCheckpoint: '10/09 - Av. Atlântica, Copacabana, Rio de Janeiro'
		},
		{
			id: '1as5d1sa5d15sa5d1as',
			type: 'Coleta',
			client: 'Fernando Rodrigues',
			inCharge: 'Juliana Santos',
			vehicle: 'Volkswagen Polo 2017',
			lastCheckpoint: '11/09 - Rua da Aurora, Recife'
		},
		{
			id: 'asd1as5d1as5d15a1s',
			type: 'Transporte',
			client: 'Patricia Lima',
			inCharge: 'Roberto Fernandes',
			vehicle: 'Ford Focus 2018',
			lastCheckpoint: '06/09 - Av. Paulista, Bela Vista, São Paulo'
		}
	]

	const data = [
		{
			icon: <FaHands />,
			title: 'Coletas',
			subtitle: 'Em andamento',
			value: '5',
			url: ''
		},
		{
			icon: <BiSolidCarGarage />,
			title: 'Armazen.',
			subtitle: 'Em 5 pátios',
			value: '23',
			url: ''
		},
		{
			icon: <GiTowTruck />,
			title: 'Transp.',
			subtitle: 'Em andamento',
			value: '18',
			url: ''
		},
		{
			icon: <GiHandTruck />,
			title: 'Cargas',
			subtitle: 'Sendo montadas',
			value: '2',
			url: ''
		},
		{
			icon: <MdOutlineCurrencyExchange />,
			title: 'Moviment.',
			subtitle: 'Esta semana',
			value: '+R$ 357k',
			valueColor: 'green',
			url: ''
		}
	]

	return (
		<Flex className='w-full max-h-full h-full flex-1 flex-col overflow-y-auto justify-start'>
			<header className='relative w-full text-white flex flex-col'>
				<div className='bg-gray-900 z-0 absolute top-1/2 w-full h-1/2 rounded-t-xl' />
				<main className='self-center w-[80%] z-10 rounded-xl shadow-xl bg-gray-900 border-4 border-gray-950 py-2 px-4'>
					<Flex className='flex-column md:flex-row gap-2'>
						{data.map((x, i) => (
							<Fragment key={x.title}>
								{i > 0 && (
									<div className='border-2 border-gray-800 opacity-50' />
								)}
								<Link href={x.url} className='flex-1'>
									<Flex
										key={x.title}
										className='gap-2 text-center items-center justify-center'
									>
										<IconBase className='text-4xl text-white'>
											{x.icon}
										</IconBase>
										<Flex className='flex-col justify-center'>
											<Text className='flex-1 text-md font-bold'>
												{x.title}
											</Text>
											{x.subtitle && (
												<Text
													className={`text-xs font-italic ${
														x.subtitle
															? ''
															: 'text-transparent'
													}`}
												>
													{x.subtitle ?? '. '}
												</Text>
											)}

											<Text
												className={`text-2xl font-bold ${
													x.valueColor === 'green'
														? 'text-green-500'
														: ''
												}`}
											>
												{x.value}
											</Text>
										</Flex>
									</Flex>
								</Link>
							</Fragment>
						))}
					</Flex>
				</main>
			</header>
			<main className='bg-gray-900 w-full h-auto flex-1 p-4 rounded-b-xl'>
				<TableContainer>
					<Table variant={'simple'} colorScheme='blue'>
						<Thead>
							<Tr>
								<Th></Th>
								<Th>Cliente</Th>
								<Th>Veículo</Th>
								<Th>Responsável</Th>
								<Th>Último checkpoint</Th>
							</Tr>
						</Thead>
						<Tbody>
							{services.map((service) => (
								<Tr key={service.id}>
									<Td>
										<IconBase title={service.type}>
											{service.type === 'Coleta' ? (
												<FaHands />
											) : service.type ===
											  'Transporte' ? (
												<GiTowTruck />
											) : service.type ===
											  'Armazenamento' ? (
												<BiSolidCarGarage />
											) : (
												<FaQuestion />
											)}
										</IconBase>
									</Td>
									<Td>{service.client}</Td>
									<Td>{service.vehicle}</Td>
									<Td>{service.inCharge}</Td>
									<Td>{service.lastCheckpoint}</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</main>
		</Flex>
	)
}
