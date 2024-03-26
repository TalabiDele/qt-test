import React from 'react'
import { useAppDispatch } from '../store/store'
import { deleteQuestion, getQuestions } from '../store/token/TokenSlice'
import { useRouter } from 'next/navigation'

interface Props {
	id: string | null
}

const Alert: React.FC<Props> = ({ id }) => {
	const dispatch = useAppDispatch()

	const router = useRouter()

	const handleDelete = () => {
		dispatch(deleteQuestion(id))

		dispatch(getQuestions())
		location.reload()

		// router.push('/questions')
	}

	return (
		<div>
			<dialog id='my_modal_2' className='modal'>
				<div role='alert' className='alert alert-warning w-[60%] flex flex-col'>
					<div className=' flex flex-col items-center text-center'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='stroke-current shrink-0 h-6 w-6 mr-[1rem]'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
							/>
						</svg>
						<span>Are you sure you want to delete question?</span>
					</div>
					<div className=' flex'>
						<form method='dialog'>
							<button className='btn btn-sm mr-[1rem]'>Deny</button>
							<button className='btn btn-sm btn-primary' onClick={handleDelete}>
								Accept
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	)
}

export default Alert
