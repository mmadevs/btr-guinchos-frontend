export interface ISignUpField {
	name:
		| 'name'
		| 'lastName'
		| 'email'
		| 'phone'
		| 'cpf'
		| 'bornIn'
		| 'cep'
		| 'houseNumber'
		| 'street'
		| 'neighbourhood'
		| 'city'
		| 'state'
		| 'password'
		| 'confirmPassword'
	label: string
	placeholder: string
	mask: string
	type: 'text' | 'number' | 'tel' | 'email' | 'password' | 'date'
	maxLength: number
	autoFocus?: boolean
	disabled?: boolean
}

export interface ILoginField {
	name: 'login' | 'password'
	label: string
	placeholder: string
	maxLength: number
	type: 'text' | 'password'
	autoFocus?: boolean
}
export interface IPasswordRecoveryField {
	name: 'cpf' | 'password' | 'confirmPassword'
	label: string
	maxLength: number
	placeholder: string
	mask: string
	type: 'text' | 'password'
}
