import React from 'react';
import Navbar from '../components/Navbar';
import LearningButton from '../components/LearningButton';

const Home = () => {
    return (
        <div className='bg-[#FAFAFA] h-screen'>
            <Navbar />
            <div className='flex flex-col justify-center items-center gap-6   h-3/4'>
                <h1 className='text-[30px] lg:text-[75px] font-bold text-center'>
                Your Gateway to Understanding Law Cases
                </h1>
                <h3 className='text-[15px] lg:text-[30px] text-center'>
                Interactive Quizzes to Facilitate Understanding of Law Cases
                </h3>
                <LearningButton size='large'/>
            </div>
        </div>
    );
}

export default Home;