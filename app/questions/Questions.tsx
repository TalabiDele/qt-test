'use client'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../store/store'
import { useSelector } from 'react-redux'
import { getQuestions, getToken } from '../store/token/TokenSlice'
import Error from './Error'
import { API_URL } from '../config'
import AddModal from '../components/AddModal'

interface Token {
	token: string
}

interface Question {
	id: number
	title: string
}

interface ErrorResponse {
	message: string
}

interface Options {
	[index: number]: string
}

interface QuestionData {
	question: string
	options: string[]
}

interface FetchedData {
	[questionId: string]: QuestionData
}

const Questions = () => {
	// const [data, setData] = useState<FetchedData | null>(null)

	const dispatch = useAppDispatch()

	useEffect(() => {
		// handleQuestions()
		dispatch(getQuestions())
	}, [dispatch])

	const getFromLocalStorage = (key: string) => {
		if (!key || typeof window === 'undefined') {
			return ''
		}
		return localStorage.getItem(key)
	}

	const token = useSelector(
		(state: { token: { data: Token | null } }) => state.token.data
	)

	console.log(getFromLocalStorage('qtToken'))

	const loading = useSelector(
		(state: {
			token: { loading: 'idle' | 'pending' | 'succeeded' | 'failed' }
		}) => state.token.loading
	)

	const data = useSelector(
		(state: { token: { data: FetchedData | null } }) => state.token.data
	)

	console.log(data)

	return (
		<div>
			{getFromLocalStorage('qtToken') ? (
				<div className=' mt-[1rem]'>
					{data ? (
						Object.entries(data).map(([questionId, questionData]) => (
							<div
								key={questionId}
								className='card w-[80%] bg-[#fff] shadow-sm p-[1rem] mb-[1rem]'
							>
								<h2 className=' font-md text-md mb-[0.5rem]'>
									{questionData?.question}
								</h2>
								<div className=' grid grid-cols-2 gap-[0.5rem] mt-[1rem]'>
									{questionData?.options?.map((option, index) => (
										<p
											key={index}
											className=' text-sm mb-[0.5rem] border-[#808080] border p-[0.5rem] rounded-md cursor-pointer hover:bg-[#f8f8f8] transition-all duration-100 ease-in-out'
										>
											{option}
										</p>
									))}
								</div>
								<div className=' mt-[1rem]'>
									<button className='btn btn-info mr-[1rem] text-[#fff]'>
										Edit question
									</button>
									<button className='btn btn-error text-[#fff]'>
										Delete question
									</button>
								</div>
							</div>
						))
					) : (
						<div className=' text-center w-[100%] mx-auto flex flex-col justify-center items-center h-[80vh]'>
							<h1 className=' font-bold text-3xl mb-[2rem]'>
								No questions available...
							</h1>

							<AddModal />
						</div>
					)}
				</div>
			) : (
				<Error />
			)}
		</div>
	)
}

export default Questions
