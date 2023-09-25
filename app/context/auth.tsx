'use client'
import { usePathname, useRouter } from 'next/navigation'
import {
	FunctionComponent,
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useLayoutEffect,
	useState
} from 'react'
import { useApi } from './api'
import { Permissions, UserNotification } from '@/app/types'

interface IAuthUser {
	id: string
	name: string
	imageUrl: string
	email: string
	permissions: Permissions
	notifications: UserNotification[]
}

interface IAuthContext {
	user?: IAuthUser
	isLoaded: boolean
	login: (values: {
		login: string
		password: string
	}) => Promise<IAuthUser | void>

	logout: () => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	const [user, setUser] = useState<IAuthUser | undefined>()
	const [isLoaded, setIsLoaded] = useState(false)
	const { api } = useApi()

	useLayoutEffect(() => {
		const storedUser = localStorage.getItem('user')

		if (storedUser) setUser(JSON.parse(storedUser))

		setIsLoaded(true)
	}, [])

	const updateNotifications = async () => {
		if (user) {
			const response = await api('app/notifications', 'GET')

			if (response?.ok) {
				const { notifications } = (await response.json()) as {
					notifications: UserNotification[]
				}

				setUser((prev) => (prev ? { ...prev, notifications } : prev))
				return notifications
			}
		}
	}

	useEffect(() => {
		let timer: NodeJS.Timer | undefined = undefined
		if (user) {
			timer = setInterval(() => {
				updateNotifications()
			}, 30 * 1000)
		}
		return () => clearInterval(timer)
	}, [user]) //eslint-disable-line

	const router = useRouter()
	const pathname = usePathname()
	useLayoutEffect(() => {
		if (isLoaded) {
			if (user && !pathname.startsWith('/app')) {
				router.push('/app/home')
			} else if (!user) {
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
			const { user: userResponse } = (await response.json()) as {
				user: IAuthUser
			}

			setUser(userResponse)
			localStorage.setItem('user', JSON.stringify(userResponse))
			return userResponse
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
		router.push('/login')
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
