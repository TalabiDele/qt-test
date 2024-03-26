'use client'
import React, { useState } from 'react'
import { useAppDispatch } from '../store/store'
import { addQuestions, getQuestions } from '../store/token/TokenSlice'
import { useSelector } from 'react-redux'
// import { useRouter } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface Values {
	question: string
	options: string[]
}

export interface FetchedData {
	[questionId: string]: Values
}

const AddModal = () => {
	const [values, setValues] = useState<Values>({
		question: '',
		options: ['', '', ''],
	})

	const router = useRouter()

	const dispatch = useAppDispatch()

	const loading = useSelector(
		(state: {
			token: { loading: 'idle' | 'pending' | 'succeeded' | 'failed' }
		}) => state.token.loading
	)

	const handleAddQuestions = (values: Values) => {
		dispatch(addQuestions(values))
		console.log(values)

		// location.reload()

		if (loading === 'succeeded') {
			// dispatch(getQuestions())
			location.reload()
		}
	}

	const openModal = () => {
		const modal = document.getElementById('my_modal_1')
		if (modal instanceof HTMLDialogElement) {
			modal.showModal()
		}
	}

	const handleInputChange = (index: number, value: string) => {
		const newOptions = [...values.options]
		newOptions[index] = value
		setValues({
			...values,
			options: newOptions,
		})
	}

	const data = useSelector(
		(state: { token: { data: FetchedData | null } }) => state.token.data
	)

	return (
		<div>
			<div className='flex w-[80%] justify-end'>
				{data && Object.entries(data).length > 0 && (
					<button
						className='btn bg-[#17171C] text-[#fff] hover:bg-[#1f1f25] mt-[1rem]'
						onClick={openModal}
					>
						Add Question
					</button>
				)}
			</div>
			<dialog id='my_modal_1' className='modal'>
				<div className='modal-box'>
					<label className='form-control w-full  mb-[1rem]'>
						<div className='label'>
							<span className='label-text'>Question *</span>
						</div>
						<input
							type='text'
							placeholder='Type here'
							className='input input-bordered w-full '
							value={values.question}
							onChange={(e) =>
								setValues({ ...values, question: e.target.value })
							}
						/>
					</label>
					<div className='grid grid-cols-2 gap-[1rem]'>
						{values.options.map((option, index) => (
							<label className='form-control w-full ' key={index}>
								<div className='label'>
									<span className='label-text'>Option {index + 1} *</span>
								</div>
								<input
									type='text'
									placeholder='Type here'
									className='input input-bordered w-full '
									value={option}
									onChange={(e) => handleInputChange(index, e.target.value)}
								/>
							</label>
						))}
					</div>
					<div className='modal-action flex w-full justify-between'>
						<form method='dialog'>
							<button
								className='btn bg-[#17171C] text-[#fff] hover:bg-[#1f1f25]'
								onClick={() => handleAddQuestions(values)}
							>
								Submit
							</button>
							<button className='btn border-[#17171C] text-[#1f1f25] hover:bg-[#ccc] bg-none'>
								Close
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	)
}

export default AddModal
