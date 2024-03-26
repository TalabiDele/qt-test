import React from 'react'
import Questions from './Questions'
import { API_URL } from '../config'
import { useSelector } from 'react-redux'
import AddModal from '../components/AddModal'

interface Token {
	token: string
}

const Page = async () => {
	const getFromLocalStorage = (key: string) => {
		if (!key || typeof window === 'undefined') {
			return ''
		}
		return localStorage.getItem(key)
	}

	console.log(getFromLocalStorage('qtToken'))

	return (
		<div>
			<div className=' ml-[1rem] max-lg:w-[90vw] max-lg:m-auto'>
				<h1 className=' font-bold text-xl mt-[1rem]'>Questions</h1>
				<AddModal />

				<Questions />
			</div>
		</div>
	)
}

export default Page
