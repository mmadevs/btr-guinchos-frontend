'use client'
import { apiUrl } from '@/infra/api'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { FunctionComponent, ReactNode, createContext, useContext } from 'react'

interface IApiContext {
	api: (
		route: string,
		method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
		body?: BodyInit | undefined
	) => Promise<Response | undefined>
}
const ApiContext = createContext<IApiContext>({} as IApiContext)

export const ApiProvider: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	const router = useRouter()
	const toast = useToast()

	const api = async (
		route: string,
		method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
		body: BodyInit | undefined = undefined
	) => {
		try {
			const headers = new Headers()
			headers.append('Content-Type', 'application/json')
			headers.append('Accept', 'application/json')

			const response = await fetch(`${apiUrl}/${route}`, {
				headers,
				method,
				body,
				credentials: 'include'
			})

			if (response.status === 403) {
				toast({
					title: 'Oops!',
					description: 'Faça login para continuar',
					colorScheme: 'red'
				})
				router.push('/login')
			} else if (response.status === 500) {
				toast({
					title: 'Oops!',
					description:
						'Erro interno no servidor! Tente novamente mais tarde.',
					colorScheme: 'red'
				})
				router.push('/login')
			} else {
				return await response
			}
		} catch (err) {
			console.error((err as Error).message, (err as Error).stack)
		}
	}

	return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>
}

export const useApi = () => {
	return useContext(ApiContext)
}
