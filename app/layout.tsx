import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'QuestionTime',
	description: 'Gain access to unlimited questions',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className=' flex'>
					<NavBar />
					<main className=' w-[100%]'>{children}</main>
				</div>
			</body>
		</html>
	)
}
