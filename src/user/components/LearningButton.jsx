import React from 'react';

const LearningButton = ({ size = 'medium' }) => {
    // Size classes based on the size prop
    const sizeClasses = {
        small: 'px-2 py-1 text-sm',
        medium: 'px-4 py-2',
        large: 'px-6 py-3 text-lg',
    };

    return (
        <div className=''>
            <ul>
                <li>
                    <a
                        href="#"
                        className={`bg-black font-bold text-white rounded-full transition duration-200 hover:bg-gray-700 ${sizeClasses[size]}`}
                    >
                        Start Learning
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default LearningButton;