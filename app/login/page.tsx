'use client'

import {
	Button,
	Card,
	CardBody,
	CardHeader,
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
import { FcGoogle } from 'react-icons/fc'

export default function Login() {
	const router = useRouter()
	const validateName = (value: string) => {
		let error = ''
		if (!value.replace(/[^a-zA-Z0-9]/g, '')) {
			error = 'Insira seu email ou CPF/CNPJ!'
		}
		return error
	}
	const validatePassword = (value: string) => {
		let error = ''
		if (!value) {
			error = 'Insira sua senha!'
		}
		return error
	}
	return (
		<main
			className={`flex flex-col p-2 items-center 
            justify-center bg-gray-900
         w-screen h-screen min-h-full `}
		>
			<HStack className=''>
				<Card
					className='w-full h-full lg:w-auto rounded overflow-hidden'
					bg={'white'}
					direction={{ base: 'column', lg: 'row' }}
				>
					<CardHeader
						color={{ base: 'black', lg: 'white' }}
						className='lg:bg-gray-800 adaptive'
					>
						<Center className='gap-4 h-full flex flex-col items-center justify-center'>
							<Image
								bg={'white'}
								className='w-16 lg:w-40 lg:p-4 lg:rounded-full'
								src='/company_logo.png'
								alt='Company logo'
							/>
							<Text fontSize={'md'}>Sistema BTR Guinchos</Text>
						</Center>
					</CardHeader>
					<CardBody className='adaptive'>
						<Center>
							<Text fontSize={'2xl'}>Faça login</Text>
						</Center>
						<Formik
							initialValues={{ name: '', password: '' }}
							onSubmit={(values, { setSubmitting }) => {
								console.log(values)
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
									className='flex flex-col gap-4'
									onSubmit={handleSubmit}
								>
									<Field name='name' validate={validateName}>
										{() => (
											<FormControl
												isInvalid={
													!!errors.name &&
													!!touched.name
												}
											>
												<FormLabel htmlFor='name'>
													Login
												</FormLabel>
												<Input
													id='name'
													autoFocus
													placeholder='Insira seu login...'
													name='name'
													type='text'
													value={values.name}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												{!!errors.name &&
												touched.name ? (
													<FormHelperText color='red'>
														{errors.name}
													</FormHelperText>
												) : (
													<FormHelperText>
														Email ou CPF/CNPJ
													</FormHelperText>
												)}
											</FormControl>
										)}
									</Field>
									<Field
										name='password'
										validate={validatePassword}
									>
										{() => (
											<FormControl
												isInvalid={
													!!errors.password &&
													!!touched.password
												}
											>
												<FormLabel htmlFor='password'>
													Senha
												</FormLabel>
												<Input
													id='password'
													placeholder='Insira sua senha...'
													name='password'
													type='password'
													value={values.password}
													onChange={handleChange}
													onBlur={handleBlur}
												/>
												{!!errors.password &&
												touched.password ? (
													<FormHelperText color='red'>
														{errors.password}
													</FormHelperText>
												) : (
													<FormHelperText>
														Insira sua senha de
														acesso
													</FormHelperText>
												)}
											</FormControl>
										)}
									</Field>
									<Button
										type='submit'
										w='full'
										bg={'gray.700'}
										colorScheme='blue'
										disabled={isSubmitting || !isValid}
										isLoading={isSubmitting}
									>
										Login
									</Button>
									<Button
										w='full'
										type='button'
										bg={'white'}
										variant={'outline'}
										leftIcon={<FcGoogle />}
										disabled={isSubmitting}
									>
										Login com o Google
									</Button>
									<Flex justify={'space-between'} w={'full'}>
										<Link
											fontSize={'smaller'}
											href='/cadastro'
										>
											Cadastrar-se
										</Link>
										<Link
											fontSize={'smaller'}
											href='/recuperar_senha'
										>
											Esqueci a senha
										</Link>
									</Flex>
								</Form>
							)}
						</Formik>
					</CardBody>
				</Card>
			</HStack>
		</main>
	)
}
