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
	Text
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/navigation'
import { IRegisterField } from '../types/Fields'
import { z } from 'zod'
import { toFormikValidate } from 'zod-formik-adapter'

export default function CadastreSe() {
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
			cpfCnpj: z
				.string()
				.refine(
					(value) =>
						[11, 14].includes(value.replace(/[^0-9]/g, '').length),
					'CPF ou CNPJ inválido!'
				),
			password: z
				.string()
				.min(8, 'Sua senha deve ter no mínimo 8 caracteres')
				.max(12, 'Sua senha deve ter no máximo 12 caracteres'),
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

	const fields: IRegisterField[] = [
		{
			name: 'name',
			label: 'Nome',
			placeholder: 'João Pedro',
			type: 'text',
			autoFocus: true
		},
		{
			name: 'lastName',
			label: 'Sobrenome',
			placeholder: 'Santos Pereira',
			type: 'text'
		},
		{
			name: 'email',
			label: 'Email',
			placeholder: 'example@example.com',
			type: 'email'
		},
		{
			name: 'cpfCnpj',
			label: 'CPF ou CNPJ',
			placeholder: '000.000.000-00',
			type: 'text'
		},
		{ name: 'password', label: 'Senha', placeholder: '', type: 'password' },
		{
			name: 'confirmPassword',
			label: 'Confirmação de senha',
			placeholder: '',
			type: 'password'
		}
	]

	return (
		<main
			className={`flex flex-col p-2 items-center 
            justify-center bg-gray-900
         w-screen h-screen min-h-full `}
		>
			<HStack className=''>
				<Flex
					className='min-w-[70vw] lg:w-auto rounded-xl overflow-hidden max-md:max-h-[95vh]'
					bg={'gray.700'}
					direction={{ base: 'column', md: 'row' }}
				>
					<Flex
						className={`gap-4 min-h-full p-8 flex flex-col items-center justify-center
                        md:bg-gray-800 adaptive md:text-white`}
						bg={'transparent'}
					>
						<Image
							bg={'white'}
							className='w-28 md:w-40 p-4 rounded-full'
							src='/company_logo.png'
							alt='Company logo'
						/>
						<Text className='text-md max-md:hidden'>
							Sistema BTR Guinchos
						</Text>
					</Flex>
					<Flex className='adaptive gap-4 p-8 flex-1 flex-col max-h-full overflow-auto'>
						<Center>
							<Text fontSize={'2xl'}>Cadastre-se</Text>
						</Center>
						<Formik
							initialValues={{
								name: '',
								lastName: '',
								email: '',
								cpfCnpj: '',
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
									className='flex flex-col md:grid grid-cols-2 gap-4'
									onSubmit={handleSubmit}
								>
									{fields.map((field) => (
										<Field
											key={field.name}
											name={field.name}
										>
											{() => (
												<FormControl
													isInvalid={
														!!errors[field.name] &&
														!!touched[field.name]
													}
												>
													<FormLabel
														htmlFor={field.name}
													>
														{field.label}
													</FormLabel>
													<Input
														id={field.name}
														autoFocus={
															field.autoFocus
														}
														placeholder={
															field.placeholder
														}
														name={field.name}
														type={field.type}
														value={
															values[field.name]
														}
														onChange={handleChange}
														onBlur={handleBlur}
													/>
													{!!errors[field.name] &&
													touched[field.name] ? (
														<FormHelperText color='red'>
															{errors[field.name]}
														</FormHelperText>
													) : (
														<Text color='transparent'>
															_
														</Text>
													)}
												</FormControl>
											)}
										</Field>
									))}
									<Flex
										direction={{
											base: 'column',
											md: 'row'
										}}
										justify={'space-between'}
										alignItems={'center'}
										className='col-span-2 gap-2'
										w={'full'}
									>
										<Link
											flex={{ base: undefined, md: 1 }}
											textAlign={'center'}
											fontSize={'smaller'}
											href='/cadastro'
										>
											Já tenho cadastro
										</Link>
										<Button
											flex={{ base: undefined, md: 1 }}
											w={{ base: 'full', md: undefined }}
											type='submit'
											bg={'gray.700'}
											colorScheme='blue'
											disabled={isSubmitting || !isValid}
											isLoading={isSubmitting}
										>
											Prosseguir
										</Button>
									</Flex>
								</Form>
							)}
						</Formik>
					</Flex>
				</Flex>
			</HStack>
		</main>
	)
}
