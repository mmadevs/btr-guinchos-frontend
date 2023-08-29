'use client'
import { Center, Image, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'

export default function VerifiqueSeuEmail() {
	return (
		<Center className='flex flex-col w-screen h-screen bg-gray-900 text-white text-center'>
			<Image
				bg={'white'}
				className='w-40 p-2 rounded-full'
				src='/company_logo.png'
				alt='Company logo'
			/>
			<Text fontSize={'3xl'}>Recuperação de senha</Text>
			<Formik initialValues={{
                email:''
            }}
            onSubmit={values => {
                useRouter
            }}
            >
                {({handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>

                    </Form>
                )}
            </Formik>
		</Center>
	)
}
