export interface IRegisterField {
	name:
		| 'name'
		| 'lastName'
		| 'email'
		| 'cpfCnpj'
		| 'password'
		| 'confirmPassword'
	label: string
	placeholder: string
	type: 'text' | 'number' | 'tel' | 'email' | 'password'
	autoFocus?: boolean
}
