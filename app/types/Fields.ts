export interface ISignInField {
	name:
		| 'name'
		| 'lastName'
		| 'email'
		| 'phone'
		| 'cpf'
		| 'bornIn'
		| 'cep'
		| 'houseNumber'
		| 'password'
		| 'confirmPassword'
	label: string
	placeholder: string
	mask: string
	type: 'text' | 'number' | 'tel' | 'email' | 'password' | 'date'
	autoFocus?: boolean
}

export interface ILoginField {
	name: 'login' | 'password'
	label: string
	placeholder: string
	type: 'text' | 'password'
	autoFocus?: boolean
}
