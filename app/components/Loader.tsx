import React from 'react'

const Loader = () => {
	return (
		<div className=' flex w-full h-[80vh] justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-[2000]'>
			<div className=''>
				<span className='loading loading-spinner loading-lg'></span>
			</div>
		</div>
	)
}

export default Loader
