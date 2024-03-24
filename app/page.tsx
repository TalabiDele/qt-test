import Image from 'next/image'
import Questions from './components/Questions'
import Link from 'next/link'
import ViewQuestions from './components/ViewQuestions'

export default function Home() {
	return (
		<div className=''>
			<div className=' text-center w-[100%] mx-auto flex flex-col justify-center items-center h-[100vh]'>
				<h1 className=' font-bold text-3xl mb-[2rem]'>
					Welcome to QuestionTime
				</h1>
				<ViewQuestions />
			</div>
		</div>
	)
}
