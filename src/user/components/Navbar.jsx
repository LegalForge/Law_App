import React from 'react';
import Logo from '../../assets/images/logo.png';
// import StartLearningButton from './LearningButton'
import LearningButton from './LearningButton';

const Navbar = () => {
    return (
        <div className='flex flex-row justify-between p-6'>

            <div>
                <img src={Logo} alt="logo" width={60} height={30} />
            </div>
            <div className=''>
                <ul className='flex flex-row mt-4 gap-4'>

                    <li>
                        <a href="#" className='font-bold text-black hover:text-gray-700 transition duration-200'>Login</a>
                    </li>

                    <LearningButton size='small' />
                </ul>
            </div>
        </div>
    );
}

export default Navbar;