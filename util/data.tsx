import { MdHome, MdEditDocument, MdAreaChart, MdSettings } from 'react-icons/md'
import { iconByType } from '@/app/components/atoms/IconByType'
import { IconType } from 'react-icons'
import { ComponentWithAs, IconProps } from '@chakra-ui/react'
export const states = [
	{ name: 'Acre', UF: 'AC' },
	{ name: 'Alagoas', UF: 'AL' },
	{ name: 'Amapá', UF: 'AP' },
	{ name: 'Amazonas', UF: 'AM' },
	{ name: 'Bahia', UF: 'BA' },
	{ name: 'Ceará', UF: 'CE' },
	{ name: 'Distrito Federal', UF: 'DF' },
	{ name: 'Espírito Santo', UF: 'ES' },
	{ name: 'Goiás', UF: 'GO' },
	{ name: 'Maranhão', UF: 'MA' },
	{ name: 'Mato Grosso', UF: 'MT' },
	{ name: 'Mato Grosso do Sul', UF: 'MS' },
	{ name: 'Minas Gerais', UF: 'MG' },
	{ name: 'Pará', UF: 'PA' },
	{ name: 'Paraíba', UF: 'PB' },
	{ name: 'Paraná', UF: 'PR' },
	{ name: 'Pernambuco', UF: 'PE' },
	{ name: 'Piauí', UF: 'PI' },
	{ name: 'Rio de Janeiro', UF: 'RJ' },
	{ name: 'Rio Grande do Norte', UF: 'RN' },
	{ name: 'Rio Grande do Sul', UF: 'RS' },
	{ name: 'Rondônia', UF: 'RO' },
	{ name: 'Roraima', UF: 'RR' },
	{ name: 'Santa Catarina', UF: 'SC' },
	{ name: 'São Paulo', UF: 'SP' },
	{ name: 'Sergipe', UF: 'SE' },
	{ name: 'Tocantins', UF: 'TO' }
]

export const tripStatus = {
	created: 'Viagem criada',
	building: 'Montando carga inicial...',
	ready: 'Carga montada!',
	traveling: 'À caminho...',
	arrived: 'Chegou ao último destino!',
	returning: 'Retornando...',
	finished: 'Viagem finalizada!'
}

export interface MenuItem {
	label: string
	imageUrl?: string
	icon: IconType | ComponentWithAs<'svg', IconProps>
	route?: string
	permission?: string
	subItems?: MenuItem[]
	onClick?: () => void
}

export const menuItems: MenuItem[] = [
	{ label: 'Início', icon: MdHome, route: '/app/home', permission: '' },
	{
		label: 'Cadastros',
		icon: MdEditDocument,
		route: '/app/cadastros',
		permission: '',
		subItems: [
			{
				label: 'Clientes',
				icon: iconByType('clients'),
				permission: '',
				route: '/clientes'
			},
			{
				label: 'Endereços',
				icon: iconByType('addresses'),
				permission: '',
				route: '/enderecos'
			},
			{
				label: 'Motoristas',
				icon: iconByType('drivers'),
				permission: '',
				route: '/motoristas'
			},
			{
				label: 'Veículos',
				icon: iconByType('vehicles'),
				permission: '',
				route: '/veiculos'
			},
			{
				label: 'Usuários',
				icon: iconByType('users'),
				permission: '',
				route: '/usuarios'
			},
			{
				label: 'Documentos',
				icon: iconByType('documents'),
				permission: '',
				route: '/documentos'
			},
			{
				label: 'Taxas e descontos',
				icon: iconByType('percent'),
				permission: '',
				route: '/taxas-descontos'
			},
			{
				label: 'Informações da empresa',
				icon: iconByType('company'),
				permission: '',
				route: '/informacoes-empresa'
			},
			{
				label: 'Marcas',
				icon: iconByType('brands'),
				permission: '',
				route: '/marcas'
			},
			{
				label: 'Contas bancárias',
				icon: iconByType('bankaccount'),
				permission: '',
				route: '/contas-bancarias'
			}
		]
	},
	{
		label: 'Relatórios',
		icon: MdAreaChart,
		route: '/app/relatorios',
		permission: ''
	},
	{
		label: 'Ajustes',
		icon: MdSettings,
		route: '/app/ajustes',
		permission: ''
	}
]
