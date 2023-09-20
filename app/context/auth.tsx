'use client'
import { useRouter } from 'next/navigation'
import {
	FunctionComponent,
	ReactNode,
	createContext,
	useContext,
	useLayoutEffect,
	useState
} from 'react'
import { useApi } from './api'

interface IAuthUser {
	name: string
	imageUrl: string
	email: string
}
const AuthContext = createContext<{
	user?: IAuthUser
	isLoaded: boolean
	login:
		| ((values: {
				login: string
				password: string
		  }) => Promise<IAuthUser | void>)
		| (() => void)
	logout: () => void
}>({ isLoaded: false, login: () => {}, logout: () => {} })

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	const [user, setUser] = useState<IAuthUser | undefined>()
	const [isLoaded, setIsLoaded] = useState(false)
	const { api } = useApi()

	useLayoutEffect(() => {
		const storedUser = localStorage.getItem('user')

		if (storedUser) {
			setUser(JSON.parse(storedUser))
		}
		setIsLoaded(true)
		// authenticate()
	}, [])

	const router = useRouter()
	useLayoutEffect(() => {
		if (isLoaded) {
			if (user) {
				router.push('/app/home')
			} else {
				router.push('/login')
			}
		}
	}, [isLoaded]) //eslint-disable-line

	const login = async (values: { login: string; password: string }) => {
		const body = JSON.stringify({
			encodedUser: Buffer.from(JSON.stringify(values)).toString('base64')
		})

		const response = await api('login', 'POST', body)

		if (response?.ok) {
			const { user } = (await response.json()) as {
				user: IAuthUser
			}
			setUser(user)
			localStorage.setItem('user', JSON.stringify(user))
			return user
		} else {
			if (response?.status == 500) {
				throw new Error('Ocorreu um erro no servidor!')
			} else if (response?.status == 404) {
				throw new Error('Usuário/Senha incorretos!')
			}
		}
	}

	const logout = () => {
		setUser(undefined)
		localStorage.removeItem('user')
	}

	return (
		<AuthContext.Provider value={{ user, isLoaded, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}
