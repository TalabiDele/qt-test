import Link from 'next/link'
import ViewQuestions from './components/ViewQuestions'

export default function Home() {
	return (
		<div className=''>
			<Link href={'/'}>
				<h1 className=' font-bold text-2xl mb-[4rem] mt-[1rem] ml-[1rem] hidden max-lg:block'>
					QuestionTime
				</h1>
			</Link>
			<div className=' text-center w-[100%] mx-auto flex flex-col justify-center items-center h-[100vh] max-lg:h-[60vh]'>
				<h1 className=' font-bold text-3xl mb-[2rem]'>
					Welcome to QuestionTime
				</h1>
				<ViewQuestions />
			</div>
		</div>
	)
}
