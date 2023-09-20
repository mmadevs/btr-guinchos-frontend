'use client'

import {
	Button,
	Center,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	HStack,
	Image,
	Input,
	Link,
	Text,
	VStack
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/navigation'
import { ISignUpField } from '@/app/types/Fields'
import { z } from 'zod'
import { intervalToDuration, isValid } from 'date-fns'
import { toFormikValidate } from 'zod-formik-adapter'
import ReactInputMask from 'react-input-mask'

export default function SignUp() {
	const router = useRouter()
	const Schema = z
		.object({
			name: z.string().min(4, { message: 'Insira um nome válido' }),
			lastName: z
				.string()
				.min(4, { message: 'Insira um sobrenome válido' }),
			email: z
				.string()
				.email('Insira um email válido')
				.min(5, { message: 'Insira um email válido' }),
			cpf: z
				.string()
				.refine(
					(value) => value.replace(/[^0-9]/g, '').length === 11,
					'CPF inválido!'
				),
			bornIn: z.string({
				invalid_type_error: 'Insira uma data de nascimento'
			}),
			phone: z
				.string()
				.refine(
					(value) =>
						[11, 14].includes(value.replace(/[^0-9]/g, '').length),
					'Telefone inválido!'
				),
			password: z
				.string()
				.min(8, 'Sua senha deve ter no mínimo 8 caracteres')
				.max(12, 'Sua senha deve ter no máximo 16 caracteres')
				.refine(
					(value) =>
						'@_-#$.*+!&'.split('').some((x) => value.includes(x)),
					'Insira um caractere especial! (@_-#$.*+!&)'
				),
			confirmPassword: z.string()
		})
		.superRefine(({ password, confirmPassword }, ctx) => {
			if (password !== confirmPassword) {
				ctx.addIssue({
					code: 'custom',
					path: ['confirmPassword'],
					message: 'As senhas não coincidem'
				})
			}
		})
		.superRefine(({ bornIn }, ctx) => {
			console.log(isValid(new Date(bornIn)), bornIn)
			if (!isValid(new Date(bornIn))) {
				ctx.addIssue({
					code: 'custom',
					path: ['bornIn'],
					message: 'Insira uma data válida'
				})
			} else if (
				(intervalToDuration({
					start: new Date(bornIn),
					end: new Date()
				})?.years ?? 0) < 16
			) {
				ctx.addIssue({
					code: 'custom',
					path: ['bornIn'],
					message: 'Você precisa ser maior de 16 anos!'
				})
			}
		})

	const fieldsGroups: { name: string; fields: ISignUpField[] }[] = [
		{
			name: 'Dados pessoais',
			fields: [
				{
					name: 'name',
					label: 'Nome:',
					mask: '',
					placeholder: 'João Pedro',
					type: 'text',
					maxLength: 50,
					autoFocus: true
				},
				{
					name: 'lastName',
					label: 'Sobrenome:',
					mask: '',
					maxLength: 60,
					placeholder: 'Santos Pereira',
					type: 'text'
				},
				{
					name: 'email',
					label: 'Email:',
					mask: '',
					maxLength: 50,
					placeholder: 'example@example.com',
					type: 'email'
				},
				{
					name: 'phone',
					label: 'Telefone: (Com DDD)',
					mask: '(99) 99999-9999',
					maxLength: 18,
					placeholder: '(71) 98888-8888',
					type: 'tel'
				},
				{
					name: 'cpf',
					label: 'CPF:',
					mask: '999.999.999-99',
					maxLength: 18,
					placeholder: '000.000.000-00',
					type: 'text'
				},
				{
					name: 'bornIn',
					label: 'Nascido em:',
					mask: '',
					maxLength: 18,
					placeholder: '01/01/1961',
					type: 'date'
				}
			]
		},
		{
			name: 'Dados de login',
			fields: [
				{
					name: 'password',
					label: 'Sua senha',
					mask: '',
					maxLength: 50,
					placeholder: '',
					type: 'password'
				},
				{
					name: 'confirmPassword',
					label: 'Confirmação de senha',
					maxLength: 50,
					mask: '',
					placeholder: '',
					type: 'password'
				}
			]
		},
		{
			name: 'Endereço',
			fields: [
				{
					name: 'cep',
					label: 'CEP:',
					mask: '99.999-999',
					maxLength: 14,
					placeholder: '40.000-000',
					type: 'text'
				},
				{
					name: 'houseNumber',
					label: 'Número:',
					mask: '',
					maxLength: 8,
					placeholder: '428-B',
					type: 'text'
				},
				{
					name: 'street',
					label: 'Logradouro:',
					mask: '',
					maxLength: 120,
					placeholder: '',
					type: 'text',
					disabled: true
				},
				{
					name: 'neighbourhood',
					label: 'Bairro:',
					maxLength: 50,
					mask: '',
					placeholder: '',
					type: 'text',
					disabled: true
				},
				{
					name: 'city',
					label: 'Cidade:',
					maxLength: 30,
					mask: '',
					placeholder: '',
					type: 'text',
					disabled: true
				},
				{
					name: 'state',
					label: 'Estado:',
					maxLength: 20,
					mask: '',
					placeholder: '',
					type: 'text',
					disabled: true
				}
			]
		}
	]

	return (
		<main
			className={`flex flex-col p-2 items-center 
            justify-center bg-gray-900
         w-screen h-[100svh] max-h-[100svh]`}
		>
			<HStack className=''>
				<Flex
					className='min-w-[95vw] lg:w-auto rounded-xl overflow-hidden max-h-[95svh] bg-gray-800'
					direction={{ base: 'column', md: 'row' }}
				>
					<Flex
						className={`min-h-full gap-4 md:p-16 flex flex-col items-center justify-center
                        md:bg-gray-800 forcedElement md:text-white`}
					>
						<Image
							overflow={'visible'}
							className='w-40 p-4 md:rounded-full forcedElement'
							src='/company_logo.png'
							alt='Company logo'
						/>

						<Text className='text-md max-md:hidden'>
							Sistema BTR Guinchos
						</Text>
					</Flex>
					<Flex className='forcedElement gap-4 px-2 md: py-2 flex-1 flex-col max-h-[95vh] overflow-y-auto'>
						<Center>
							<Text fontSize={'2xl'}>Cadastre-se</Text>
						</Center>
						<Formik
							initialValues={{
								name: '',
								lastName: '',
								email: '',
								phone: '',
								cpf: '',
								bornIn: '',
								cep: '',
								houseNumber: '',
								street: '',
								neighbourhood: '',
								city: '',
								state: '',
								password: '',
								confirmPassword: ''
							}}
							validate={toFormikValidate(Schema)}
							onSubmit={(values, { setSubmitting }) => {
								setTimeout(() => {
									alert('Bem vindo!')
									setSubmitting(false)
									router.push('/home')
								}, 400)
							}}
						>
							{({
								values,
								errors,
								handleChange,
								handleBlur,
								handleSubmit,
								isSubmitting,
								isValid,
								touched
							}) => (
								<Form
									className='overflow-y-auto flex flex-col gap-4 p-2'
									onSubmit={handleSubmit}
								>
									{fieldsGroups.map((group) => (
										<fieldset
											key={group.name}
											className='p-2 flex flex-col md:grid grid-cols-2 gap-4'
										>
											<legend className='text-sm text-gray-600'>
												{group.name}
											</legend>
											{group.fields.map(
												({
													name,
													label,
													type,
													autoFocus,
													placeholder,
													disabled,
													maxLength,
													mask
												}) => (
													<Field
														key={name}
														name={name}
													>
														{() => (
															<FormControl
																isInvalid={
																	!!errors[
																		name
																	] &&
																	!!touched[
																		name
																	]
																}
															>
																<FormLabel
																	htmlFor={`${name}-input`}
																>
																	{label}
																</FormLabel>
																<ReactInputMask
																	alwaysShowMask
																	mask={mask}
																	maxLength={
																		maxLength
																	}
																	autoFocus={
																		autoFocus
																	}
																	placeholder={
																		placeholder
																	}
																	disabled={
																		disabled
																	}
																	name={name}
																	value={
																		values[
																			name
																		]
																	}
																	onChange={
																		handleChange
																	}
																	onBlur={
																		handleBlur
																	}
																>
																	<Input
																		id={`${name}-input`}
																		type={
																			type
																		}
																		variant='flushed'
																		borderColor={
																			'blackAlpha.400'
																		}
																	/>
																</ReactInputMask>
																{!!errors[
																	name
																] &&
																touched[
																	name
																] ? (
																	<FormHelperText color='red'>
																		{
																			errors[
																				name
																			]
																		}
																	</FormHelperText>
																) : (
																	<Text color='transparent'>
																		_
																	</Text>
																)}
															</FormControl>
														)}
													</Field>
												)
											)}
										</fieldset>
									))}
									<VStack
										className='col-span-2 gap-2'
										w={'full'}
									>
										<Button
											flex={1}
											w='full'
											minH={50}
											type='submit'
											bg={'gray.700'}
											colorScheme='blue'
											disabled={isSubmitting || !isValid}
											isLoading={isSubmitting}
										>
											Prosseguir
										</Button>
										<Flex
											justify={'center'}
											w={'full'}
											p={5}
										>
											<Link
												fontSize={{
													base: 'medium',
													md: 'smaller'
												}}
												href='/login'
											>
												Já tenho cadastro
											</Link>
										</Flex>
									</VStack>
								</Form>
							)}
						</Formik>
					</Flex>
				</Flex>
			</HStack>
		</main>
	)
}
