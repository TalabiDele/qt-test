import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './NavBar'
import store from './store/store'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

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
			<Providers>
				<body className={inter.className}>
					<Toaster position='top-center' reverseOrder={false} />
					<div className=' flex relative right-0 left-0'>
						<NavBar />
						<main className=' w-[100%] pb-[5rem] relative'>{children}</main>
					</div>
				</body>
			</Providers>
		</html>
	)
}
