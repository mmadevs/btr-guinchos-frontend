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
	// Link,
	Text,
	VStack
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/navigation'
import { IPasswordRecoveryField } from '@/app/types/Fields'
// import { headers } from 'next/dist/client/components/headers'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export default function PasswordRecovery() {
	const router = useRouter()
	// const headersList = headers()
	const { data: session } = useSession()
	const [fieldsGroups, setFieldsGroups] = useState<
		{ name: string; fields: IPasswordRecoveryField[] }[]
	>([])

	useEffect(() => {
		// const authorization = headersList.get('authorization')

		if (session?.user) {
			setFieldsGroups([])
		} else {
			setFieldsGroups([
				{
					name: '',
					fields: [
						{
							name: 'cpf',
							label: 'Informe o seu CPF:',
							mask: '999.999.999-99',
							placeholder: '000.000.000-00',
							maxLength: 14,
							type: 'text'
						}
					]
				}
			])
		}
	}, []) // eslint-disable-line

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
								cpf: '',
								password: '',
								confirmPassword: ''
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
