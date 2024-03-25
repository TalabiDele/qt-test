'use client'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../store/store'
import { useSelector } from 'react-redux'
import { getToken } from '../store/token/TokenSlice'
import Error from './Error'
import { API_URL } from '../config'

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
	const [data, setData] = useState<FetchedData | null>(null)

	useEffect(() => {
		handleQuestions()
	}, [])

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

	const userToken: string | null = getFromLocalStorage('qtToken')
		? getFromLocalStorage('qtToken')
		: ''

	console.log(userToken)

	const headers = new Headers()
	headers.append('Host', 'qt.organogram.app')
	headers.append('Token', userToken)
	headers.append('Content-Type', 'application/json')

	const handleQuestions = async () => {
		try {
			const response = await fetch(`${API_URL}/questions`, {
				headers: headers,
			})
			if (!response.ok) {
				console.log(response.status)
			}
			const responseData = await response.json()

			if (Object.entries(responseData).length === 0) {
				setData(null)
			} else {
				setData(responseData)
			}

			console.log(responseData)
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}

	console.log('fetched data:', data)

	return (
		<div>
			{getFromLocalStorage('qtToken') ? (
				<div className=''>
					{data ? (
						Object.entries(data).map(([questionId, questionData]) => (
							<li key={questionId}>
								<h2>{questionData.question}</h2>
								<div>
									{questionData.options.map((option, index) => (
										<li key={index}>{option}</li>
									))}
								</div>
							</li>
						))
					) : (
						<div className=' text-center w-[100%] mx-auto flex flex-col justify-center items-center h-[80vh]'>
							<h1 className=' font-bold text-3xl mb-[2rem]'>
								No questions available...
							</h1>
							<button className='btn btn-wide bg-[#17171C] text-[#fff] hover:bg-[#1f1f25]'>
								Add Question
							</button>
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
