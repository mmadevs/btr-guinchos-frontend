import { Company, Individual, Person, Vehicle } from '@/app/types'

export const getNameAndLastName = (
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

export const formatVehicle = (
	vehicle: Vehicle,
	brand = true,
	version = false,
	modelOf = false
) => {
	const _brand = brand && vehicle.brand.displayName
	const _model = vehicle.model
	const _version = version && vehicle.version && vehicle.modelOf
	const _modelOf = modelOf && formatYear(vehicle.modelOf)

	return [_brand, _model, _version, _modelOf].filter(Boolean).join(' ')
}

export const formatCPForCNPJ = (person: Person) => {
	if (Object.hasOwn(person, 'cpf')) {
		const { cpf } = person as Individual
		return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
			6,
			9
		)}-${cpf.slice(9)}`
	} else if (Object.hasOwn(person, 'cnpj')) {
		const { cnpj } = person as Company
		return `${cnpj.slice(0, 2)}.${cnpj.slice(2, 5)}.${cnpj.slice(
			5,
			8
		)}/${cnpj.slice(8, 12)}-${cnpj.slice(12)}`
	} else {
		return person.id
	}
}

export const formatYear = (date: Date | string) => {
	return new Date(date).toLocaleString('pt-BR', {
		year: 'numeric'
	})
}
