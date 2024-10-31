import React from 'react';

const QuizPage = () => {
    return (
        <div className='bg-teal-100 h-screen flex flex-col items-center justify-center font-sans gap-8'>
            <div className='text-center'>
                <h1 className='text-blue-600 text-[34px] font-semibold sm:text-[44px]'>What is the Answer to this  Question?</h1>
            </div>

            <div className='flex flex-col space-y-4'>
                 
                <div className='flex items-center  bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition'>
                    <div className='flex items-center justify-center w-10 h-10 bg-blue-500 border border-gray-300 rounded'>
                        <p className='text-white text-2xl font-bold'>A</p>
                    </div>
                    <p className='text-gray-800 text-lg w-[350px] ml-2'>Choice 1</p>
                </div>
                <div className='flex items-center  bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition'>
                    <div className='flex items-center justify-center w-10 h-10 bg-blue-500 border border-gray-300 rounded'>
                        <p className='text-white text-2xl font-bold'>B</p>
                    </div>
                    <p className='text-gray-800 text-lg w-[350px] ml-2'>Choice 2</p>
                </div>
                <div className='flex items-center  bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition'>
                    <div className='flex items-center justify-center w-10 h-10 bg-blue-500 border border-gray-300 rounded'>
                        <p className='text-white text-2xl font-bold'>C</p>
                    </div>
                    <p className='text-gray-800 text-lg w-[350px] ml-2'>Choice 3</p>
                </div>
                <div className='flex items-center  bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition'>
                    <div className='flex items-center justify-center w-10 h-10 bg-blue-500 border border-gray-300 rounded'>
                        <p className='text-white text-2xl font-bold'>D</p>
                    </div>
                    <p className='text-gray-800 text-lg w-[350px] ml-2'>Choice 4</p>
                </div>
            </div>
        </div>
    );
}

export default QuizPage;