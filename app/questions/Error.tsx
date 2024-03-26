'use client'
import React, { useEffect, useState } from 'react'
import { getToken } from '../store/token/TokenSlice'
import { useAppDispatch } from '../store/store'
import { useSelector } from 'react-redux'

interface Data {
	email: string
}

const Error = () => {
	const [formValue, setFormValue] = useState<Data>({ email: '' })

	const dispatch = useAppDispatch()

	const loading = useSelector(
		(state: {
			token: { loading: 'idle' | 'pending' | 'succeeded' | 'failed' }
		}) => state.token.loading
	)

	const handleToken = (values: Data) => {
		dispatch(getToken(values))

		if (loading === 'succeeded') {
			// console.log(data)
		}
	}

	return (
		<div className=' text-center flex flex-col justify-center h-[80vh] items-center'>
			<h1 className=' font-bold text-xl'>
				...oops! You need a token to gain access.
			</h1>

			<p className=' text-sm mb-[2rem]'>Enter email to get token</p>

			<div className='join'>
				<input
					className='input input-bordered join-item'
					placeholder='Email'
					value={formValue.email}
					onChange={(e) => setFormValue({ email: e.target.value })}
				/>
				<button
					className='btn join-item rounded-r-full bg-[#17171C] text-[#fff] hover:bg-[#1f1f25]'
					onClick={() => handleToken(formValue)}
				>
					Get token
				</button>
			</div>
		</div>
	)
}

export default Error
