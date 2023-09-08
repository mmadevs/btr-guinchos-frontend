// 'use client'

// import {
// 	Button,
// 	Card,
// 	CardBody,
// 	CardHeader,
// 	Center,
// 	Flex,
// 	FormControl,
// 	FormHelperText,
// 	FormLabel,
// 	HStack,
// 	Image,
// 	Input,
// 	Link,
// 	Text
// } from '@chakra-ui/react'
// import { Formik, Form, Field } from 'formik'
// import { useRouter } from 'next/navigation'

// export default function Login() {
// 	const router = useRouter()
// 	const validateName = (value: string) => {
// 		let error = ''
// 		if (!value.replace(/[^a-zA-Z0-9]/g, '')) {
// 			error = 'Insira seu email ou CPF!'
// 		}
// 		return error
// 	}
// 	const validatePassword = (value: string) => {
// 		let error = ''
// 		if (!value) {
// 			error = 'Insira sua senha!'
// 		}
// 		return error
// 	}
// 	return (
// 		<main
// 			className={`flex flex-col p-2 items-center
//             justify-center bg-gray-900
//          w-screen h-screen min-h-full `}
// 		>
// 			<HStack className=''>
// 				<Card
// 					className='w-full h-full lg:w-auto rounded overflow-hidden'
// 					bg={'white'}
// 					direction={{ base: 'column', lg: 'row' }}
// 				>
// 					<CardHeader
// 						color={{ base: 'black', lg: 'white' }}
// 						className='lg:bg-gray-800 forcedElement'
// 					>
// 						<Center className='gap-4 h-full flex flex-col items-center justify-center'>
// 							<Image
// 								bg={'white'}
// 								className='w-16 lg:w-40 lg:p-4 lg:rounded-full'
// 								src='/company_logo.png'
// 								alt='Company logo'
// 							/>
// 							<Text fontSize={'md'}>Sistema BTR Guinchos</Text>
// 						</Center>
// 					</CardHeader>
// 					<CardBody className='forcedElement'>
// 						<Center>
// 							<Text fontSize={'2xl'}>Faça login</Text>
// 						</Center>
// 						<Formik
// 							initialValues={{ name: '', password: '' }}
// 							onSubmit={(values, { setSubmitting }) => {
// 								console.log(values)
// 								setTimeout(() => {
// 									alert('Bem vindo!')
// 									setSubmitting(false)
// 									router.push('/home')
// 								}, 400)
// 							}}
// 						>
// 							{({
// 								values,
// 								errors,
// 								handleChange,
// 								handleBlur,
// 								handleSubmit,
// 								isSubmitting,
// 								isValid,
// 								touched
// 							}) => (
// 								<Form
// 									className='flex flex-col gap-4'
// 									onSubmit={handleSubmit}
// 								>
// 									<Field name='name' validate={validateName}>
// 										{() => (
// 											<FormControl
// 												isInvalid={
// 													!!errors.name &&
// 													!!touched.name
// 												}
// 											>
// 												<FormLabel htmlFor='name'>
// 													Login
// 												</FormLabel>
// 												<Input
// 													id='name'
// 													autoFocus
// 													placeholder='Insira seu login...'
// 													name='name'
// 													type='text'
// 													value={values.name}
// 													onChange={handleChange}
// 													onBlur={handleBlur}
// 												/>
// 												{!!errors.name &&
// 												touched.name ? (
// 													<FormHelperText color='red'>
// 														{errors.name}
// 													</FormHelperText>
// 												) : (
// 													<FormHelperText>
// 														Email ou CPF
// 													</FormHelperText>
// 												)}
// 											</FormControl>
// 										)}
// 									</Field>
// 									<Field
// 										name='password'
// 										validate={validatePassword}
// 									>
// 										{() => (
// 											<FormControl
// 												isInvalid={
// 													!!errors.password &&
// 													!!touched.password
// 												}
// 											>
// 												<FormLabel htmlFor='password'>
// 													Senha
// 												</FormLabel>
// 												<Input
// 													id='password'
// 													placeholder='Insira sua senha...'
// 													name='password'
// 													type='password'
// 													value={values.password}
// 													onChange={handleChange}
// 													onBlur={handleBlur}
// 												/>
// 												{!!errors.password &&
// 												touched.password ? (
// 													<FormHelperText color='red'>
// 														{errors.password}
// 													</FormHelperText>
// 												) : (
// 													<FormHelperText>
// 														Insira sua senha de
// 														acesso
// 													</FormHelperText>
// 												)}
// 											</FormControl>
// 										)}
// 									</Field>
// 									<Button
// 										type='submit'
// 										w='full'
// 										bg={'gray.700'}
// 										colorScheme='blue'
// 										disabled={isSubmitting || !isValid}
// 										isLoading={isSubmitting}
// 									>
// 										Login
// 									</Button>
// 									<Flex justify={'space-between'} w={'full'}>
// 										<Link
// 											fontSize={'smaller'}
// 											href='/cadastre-se'
// 										>
// 											Cadastrar-se
// 										</Link>
// 										<Link
// 											fontSize={'smaller'}
// 											href='/recuperar-senha'
// 										>
// 											Esqueci a senha
// 										</Link>
// 									</Flex>
// 								</Form>
// 							)}
// 						</Formik>
// 					</CardBody>
// 				</Card>
// 			</HStack>
// 		</main>
// 	)
// }
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
import { ILoginField } from '../types/Fields'

export default function Login() {
	const router = useRouter()

	const fieldsGroups: { name: string; fields: ILoginField[] }[] = [
		{
			name: '',
			fields: [
				{
					name: 'login',
					label: 'Email ou CPF:',
					placeholder: 'usuario@example.com',
					type: 'text',
					autoFocus: true
				},
				{
					name: 'password',
					label: 'Sua senha',
					placeholder: '',
					type: 'password'
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
					className='min-w-[95vw] md:min-w-[60vw] rounded-xl overflow-hidden max-h-[95svh] bg-gray-800'
					direction={{ base: 'column', md: 'row' }}
				>
					<Flex
						className={`min-h-full gap-4 p-16 flex flex-col items-center justify-center
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
					<Flex className='forcedElement gap-4 p-2 flex-1 flex-col max-h-[95vh] overflow-y-auto'>
						<Center>
							<Text fontSize={'2xl'}>Faça login</Text>
						</Center>
						<Formik
							initialValues={{
								login: '',
								password: ''
							}}
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
											className='p-2 flex flex-col gap-4'
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
													placeholder
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

																<Input
																	id={`${name}-input`}
																	type={type}
																	variant='flushed'
																	borderColor={
																		'blackAlpha.400'
																	}
																	autoFocus={
																		autoFocus
																	}
																	placeholder={
																		placeholder
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
																/>
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
											justify={'space-between'}
											w={'full'}
											p={5}
										>
											<Link
												fontSize={{
													base: 'medium',
													md: 'smaller'
												}}
												href='/cadastre-se'
											>
												Cadastrar-se
											</Link>
											<Link
												fontSize={{
													base: 'medium',
													md: 'smaller'
												}}
												href='/recuperar-senha'
											>
												Esqueci a senha
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
