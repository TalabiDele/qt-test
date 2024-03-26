import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../store/store'
import { editQuestion } from '../store/token/TokenSlice'

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

interface Props {
	values: EditData
}

const EditModal: React.FC<Props> = ({ values }) => {
	const [data, setData] = useState<EditData>(values)

	const dispatch = useAppDispatch()

	useEffect(() => {
		setData(values)
	}, [values])

	const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setData((prevState) => ({
			...prevState,
			data: {
				...prevState.data,
				question: e.target.value,
			},
		}))
	}

	const handleOptionChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const newOptions = [...data.data.options]
		newOptions[index] = e.target.value
		setData((prevState) => ({
			...prevState,
			data: {
				...prevState.data,
				options: newOptions,
			},
		}))
	}

	const handleEditQuestion = () => {
		dispatch(editQuestion(data))

		location.reload()
	}

	return (
		<div>
			<dialog id='my_modal_3' className='modal'>
				<div className='modal-box'>
					<label className='form-control w-full  mb-[1rem]'>
						<div className='label'>
							<span className='label-text'>Question *</span>
						</div>
						<input
							type='text'
							placeholder='Type here'
							className='input input-bordered w-full '
							value={data?.data?.question}
							onChange={handleQuestionChange}
							name='question'
						/>
					</label>
					<div className='grid grid-cols-2 gap-[1rem]'>
						{data?.data?.options?.map((option, index) => (
							<label className='form-control w-full ' key={index}>
								<div className='label'>
									<span className='label-text'>Option {index + 1} *</span>
								</div>
								<input
									type='text'
									placeholder='Type here'
									className='input input-bordered w-full '
									value={option}
									onChange={(e) => handleOptionChange(index, e)}
								/>
							</label>
						))}
					</div>
					<div className='modal-action flex w-full justify-between'>
						<form method='dialog'>
							<button
								className='btn bg-[#17171C] text-[#fff] hover:bg-[#1f1f25]'
								onClick={() => handleEditQuestion()}
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

export default EditModal
