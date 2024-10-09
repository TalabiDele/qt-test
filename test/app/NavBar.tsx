import Link from 'next/link'
import React from 'react'
import { IoMenu } from 'react-icons/io5'

const NavBar = () => {
	return (
		<div>
			<div className='drawer lg:drawer-open h-screen sticky top-0 z-[100]'>
				<input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
				<div className='drawer-content flex flex-col items-end absolute w-[90vw] top-[1rem]'>
					<label
						htmlFor='my-drawer-2'
						className='btn btn-primary drawer-button lg:hidden'
					>
						<IoMenu fontSize={20} />
					</label>
				</div>
				<div className='drawer-side'>
					<label
						htmlFor='my-drawer-2'
						aria-label='close sidebar'
						className='drawer-overlay'
					></label>
					<ul className='menu p-4 w-[15rem] min-h-full bg-white text-base-content shadow-md'>
						<Link href={'/'}>
							<h1 className=' font-bold text-2xl mb-[4rem]'>QuestionTime</h1>
						</Link>
						<li className=' mb-[2rem]'>
							<Link href={'/'}>Home</Link>
						</li>
						<li>
							<Link href={'/questions'}>Questions</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default NavBar
