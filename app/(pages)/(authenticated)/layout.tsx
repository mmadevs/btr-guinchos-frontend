import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthenticatedLayout from '@/app/components/templates/AuthenticatedLayout'

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
			<body className={inter.className}>
				<AuthenticatedLayout>{children}</AuthenticatedLayout>
			</body>
		</html>
	)
}
