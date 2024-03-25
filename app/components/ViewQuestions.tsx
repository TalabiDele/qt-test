'use client'

import Link from 'next/link'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'

const key = 'key'
const initialValue = { token: '' }

const ViewQuestions = () => {
	const [value, setValue] = useLocalStorage(key, initialValue, {
		initializeWithValue: false,
	})

	const handleQuestionsView = () => {
		// if()
	}

	return (
		<div>
			{/* <Link href={'/questions'}> */}
			<button className='btn btn-wide bg-[#17171C] text-[#fff] hover:bg-[#1f1f25]'>
				View Questions
			</button>
			{/* </Link> */}
		</div>
	)
}

export default ViewQuestions
