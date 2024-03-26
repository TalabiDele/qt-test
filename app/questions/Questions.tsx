'use client'
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '../store/store'
import { useSelector } from 'react-redux'
import { getQuestions, getToken } from '../store/token/TokenSlice'
import Error from './Error'
import { API_URL } from '../config'
import AddModal from '../components/AddModal'
import Alert from '../components/Alert'
import Loader from '../components/Loader'
import EditModal from '../components/EditModal'

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

interface EditData {
	id: string
	data: QuestionData
}

export interface FetchedData {
	[questionId: string]: QuestionData
}

interface Token {
	token: string
}

const Questions = () => {
	const [id, setId] = useState<string | null>(null)
	const [values, setValues] = useState<EditData>({
		id: '',
		data: {
			question: '',
			options: ['', '', '', '', ''],
		},
	})

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

	const loading = useSelector(
		(state: {
			token: { loading: 'idle' | 'pending' | 'succeeded' | 'failed' }
		}) => state.token.loading
	)

	const data = useSelector(
		(state: { token: { data: FetchedData | null } }) => state.token.data
	)

	console.log(data)

	const openDeleteModal = (questionId: string) => {
		const modal = document.getElementById('my_modal_2')
		if (modal instanceof HTMLDialogElement) {
			modal.showModal()
		}

		setId(questionId)
	}

	const openModal = () => {
		const modal = document.getElementById('my_modal_1')
		if (modal instanceof HTMLDialogElement) {
			modal.showModal()
		}
	}

	const openEdit = (questionId: string, questionData: QuestionData) => {
		const modal = document.getElementById('my_modal_3')
		if (modal instanceof HTMLDialogElement) {
			modal.showModal()
		}

		setValues({
			id: questionId,
			data: {
				question: questionData?.question,
				options: [
					questionData?.options[0],
					questionData?.options[1],
					questionData?.options[2],
					questionData?.options[3],
					questionData?.options[4],
				],
			},
		})
	}

	return (
		<div>
			<EditModal values={values} />
			<Alert id={id} />

			{loading === 'pending' ? (
				<Loader />
			) : getFromLocalStorage('qtToken') ? (
				<div className=' mt-[1rem] max-lg:w-full'>
					{data &&
						Object.entries(data).map(([questionId, questionData]) => (
							<div
								key={questionId}
								className='card w-[80%] bg-[#fff] shadow-sm p-[1rem] mb-[1rem] max-lg:w-full'
							>
								<h2 className=' font-md text-md mb-[0.5rem]'>
									{questionData?.question}
								</h2>
								<div className=' grid grid-cols-2 gap-[0.5rem] mt-[1rem]'>
									{questionData?.options?.map(
										(option, index) =>
											option !== '' && (
												<p
													key={index}
													className={` text-sm mb-[0.5rem] border-[#808080] border p-[0.5rem] rounded-md cursor-pointer hover:bg-[#f8f8f8] transition-all duration-100 ease-in-out`}
												>
													{option}
												</p>
											)
									)}
								</div>
								<div className=' mt-[1rem]'>
									<button
										className='btn btn-info mr-[1rem] text-[#fff]'
										onClick={() => openEdit(questionId, questionData)}
									>
										Edit question
									</button>
									<button
										className='btn btn-error text-[#fff]'
										onClick={() => openDeleteModal(questionId)}
									>
										Delete question
									</button>
								</div>
							</div>
						))}
					{data === null && (
						<div className=' text-center w-[100%] mx-auto flex flex-col justify-center items-center h-[80vh]'>
							<h1 className=' font-bold text-3xl mb-[2rem]'>
								No questions available...
							</h1>
							<button
								className='btn bg-[#17171C] text-[#fff] hover:bg-[#1f1f25] mt-[1rem]'
								onClick={openModal}
							>
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
