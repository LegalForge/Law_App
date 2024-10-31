import React from 'react'

import Navbar from '../components/Navbar'
import StartLearningButton from '../components/StartLearningButton'

const Home = () => {
    return (
        <>
            <Navbar />
            <div className='flex flex-col justify-center items-center gap-4 '>
                <h1 className='text-[70px] sm:text-[50px] font-bold'>The Easiest Way to Learn</h1>
                <h3 className='text-[45px] sm:text-[30px]'>Case quizes to make learning easier</h3>
                <StartLearningButton  />
            </div>
        </>
    )
}

export default Home
