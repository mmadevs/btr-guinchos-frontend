import { Vehicle } from '@/app/types'

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
	const _brand = brand && vehicle.brand.name
	const _model = vehicle.model
	const _version = version && vehicle.version && vehicle.modelOf
	const _modelOf = modelOf && formatYear(vehicle.modelOf)

	return [_brand, _model, _version, _modelOf].filter(Boolean).join(' ')
}

export const formatYear = (date: Date | string) => {
	return new Date(date).toLocaleString('pt-BR', {
		year: 'numeric'
	})
}
