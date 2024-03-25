'use client'
import Link from 'next/link'
import React from 'react'

const ViewQuestions = () => {
	return (
		<div>
			<Link href={'/questions'}>
				<button className='btn btn-wide bg-[#17171C] text-[#fff] hover:bg-[#1f1f25]'>
					View Questions
				</button>
			</Link>
		</div>
	)
}

export default ViewQuestions
