import React from 'react' 
import Logo from '../../assets/images/logo.png'
const Navbar = () => {

    return(
        <div className='flex flex-row  justify-between p-8'>
            <div className='bg-red-50'> <img src={Logo} alt="logo" width={120} height={30} />
            </div>
            <div className=''>
                <ul className='flex flex-row sm:m-6 gap-10'>
                    <li>
                        <a href="#" className='font-bold'>Login</a></li>
                    <li><a href="#" className="bg-black font-bold text-white rounded-full px-4 py-2 transition duration-200 hover:bg-gray-700 p-6">Start Learning</a></li>
                </ul>
            </div>
        </div>
    )
}
export default Navbar