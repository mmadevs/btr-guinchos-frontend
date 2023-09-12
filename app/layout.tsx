import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './components/templates/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'BTR Guinchos',
	description: 'App da BTR Guinchos'
}

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='pt-BR'>
			<head>
				<meta name='color-scheme' content='dark' />
			</head>
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
