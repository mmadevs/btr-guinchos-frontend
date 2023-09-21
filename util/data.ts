import { IconType } from 'react-icons'
import { MdHome, MdEditDocument, MdAreaChart, MdSettings } from 'react-icons/md'
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

export const menuButtons: { label: string; icon: IconType; route: string }[] = [
	{ label: 'Início', icon: MdHome, route: '/app/home' },
	{ label: 'Cadastros', icon: MdEditDocument, route: '/app/cadastros' },
	{ label: 'Relatórios', icon: MdAreaChart, route: '/app/relatorios' },
	{ label: 'Ajustes', icon: MdSettings, route: '/app/ajustes' }
]
