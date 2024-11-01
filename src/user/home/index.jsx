import React from 'react';
import Navbar from '../components/Navbar';
import StartLearningButton from '../components/LearningButton';

const Home = () => {
    return (
        <>
            <Navbar />
            <div className='flex flex-col justify-center items-center gap-6 mt-4 h-3/4'>
                <h1 className='text-[30px] lg:text-[75px] font-bold text-center'>
                    The Easiest Way to Learn
                </h1>
                <h3 className='text-[15px] lg:text-[30px] text-center'>
                    Case quizzes to make learning easier
                </h3>
                <StartLearningButton size='large'/>
            </div>
        </>
    );
}

export default Home;