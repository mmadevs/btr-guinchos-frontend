import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as unknown as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as unknown as string
		})
	]
})

export { handler as GET, handler as POST }
