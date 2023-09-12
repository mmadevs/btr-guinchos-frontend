import {
	FunctionComponent,
	ReactNode,
	createContext,
	useContext,
	useState
} from 'react'

interface IAuthUser {
	name: string
	imageUrl: string
	email: string
}
// interface IAuthTokens {
// 	token: string
// 	refreshToken: string
// }
const AuthContext = createContext<{
	user: IAuthUser | null
	// tokens: IAuthTokens | null
	accessToken: string | null
	login:
		| ((values: { login: string; password: string }) => Promise<
				| {
						user: IAuthUser | null
						// tokens: IAuthTokens | null
						accessToken: string | null
				  }
				| number
		  >)
		| (() => void)
	logout: () => void
}>({ user: null, accessToken: null, login: () => {}, logout: () => {} })

export const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({
	children
}) => {
	const [user, setUser] = useState<IAuthUser | null>(null)
	// const [tokens, setTokens] = useState<IAuthTokens | null>(null)
	const [accessToken, setAccessToken] = useState<string | null>(null)

	const login = async (values: { login: string; password: string }) => {
		let response: Response | undefined
		try {
			const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/login`

			const body = JSON.stringify({
				encodedUser: Buffer.from(JSON.stringify(values)).toString(
					'base64'
				)
			})

			response = await fetch(apiUrl, {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body,
				credentials: 'include'
			})

			console.log(response)
			if (response?.ok) {
				const data = (await response.json()) as {
					user: IAuthUser
					accessToken: string
				}

				setUser(data.user)
				setAccessToken(data.accessToken)

				return data
			} else {
				return response?.status ?? 500
			}
		} catch (err) {
			return response?.status ?? 500
		}
	}

	const logout = () => {
		setUser(null)
		setAccessToken(null)
	}

	return (
		<AuthContext.Provider value={{ user, accessToken, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}
