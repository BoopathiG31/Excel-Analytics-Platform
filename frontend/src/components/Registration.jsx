import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { MdAlternateEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice';
import { images } from '../assets/assets';

const Registration = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const {loading, error } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(registerUser(formData));

        if (registerUser.fulfilled.match(resultAction)) {
            const {user, token }= resultAction.payload;

            console.log("User:", user);
            console.log("Token:", token)

            navigate('/');
                    
        }
    };



    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };


    
  return (

    <div className="min-h-screen bg-gradient-to-r from-start to-yellow-400  flex items-center justify-center p-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg w-full max-w-4xl  flex flex-col md:flex-row overflow-hidden h-[550px]">
            <div className='w-full md:w-1/2 p-6 '>
                <div className="flex flex-col ">
                    <h1 className='text-3xl text-yellow-400 font-semibold'>Excel <span className='text-gray-950' >Analytics</span></h1>
                    <p className='font-medium text-lg text-gray-500 mt-1'>Create your account</p>
                    {error && <div className="text-sm text-red-600 mt-2">
                        {error}
                    </div>}
                    <form className='w-full flex flex-col gap-3 mt-2' onSubmit={handleSubmit}>
                        <div className='w-full border-2 border-gray-950 flex items-center gap-2 rounded-xl'>
                            <FaRegUserCircle className='ml-3 text-gray-950'/>
                            <input 
                                type="text"
                                className='w-full border-0 outline-0 text-sm md:text-base p-3 ps-0 bg-transparent'
                                placeholder='Username'
                                name='username'
                                onChange={handleInputChange}
                                value={formData.username}
                            />
                        </div>

                        <div className='w-full border-2 border-gray-950  flex items-center gap-2 rounded-xl'>
                            <MdAlternateEmail className='ml-3 text-gray-950'/>
                            <input 
                                type="email"
                                className='w-full border-0 outline-0 text-sm md:text-base p-3 ps-0  bg-transparent'
                                placeholder='Enter Your Email'
                                name='email'
                                onChange={handleInputChange}
                                value={formData.email}
                            />
                        </div>
                        <div className='w-full border-2 border-gray-950 flex items-center gap-2 rounded-xl'>
                            <TbLockPassword className='ml-3 text-gray-950'/>
                            <input
                                type="password" 
                                className='w-full border-0 outline-0 text-sm md:text-base p-3 ps-0 bg-transparent'
                                placeholder='Passcode'
                                name='password'
                                onChange={handleInputChange}
                                value={formData.password}
                            />
                        </div>
                        
                        <div className='flex flex-col gap-y-4'>
                            <label className='pe-2'>
                                <input
                                type="checkbox"
                                className='accent-black'
                                />
                                <span className='text-sm pl-2'>
                                    I agree to the <a href="#" className='font-medium mt-3 cursor-pointer text-yellow-400'>Terms & Condition</a>
                                </span>
                            </label>
                            {loading? <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all bg-gray-950  text-white rounded-xl cursor-pointer py-3'>Sign Up ...</button> 
                            : <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all bg-gray-950  text-white rounded-xl cursor-pointer py-3'>Sign Up</button>}
                        </div>
                        
                    </form>
                    <div className='flex  flex-col gap-3'>
                        <p className='flex justify-center'>----- or -----</p>
                        <div className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all flex justify-center items-center border-1 rounded-xl cursor-pointer'>
                            <FcGoogle/>
                            <p className=' pl-2 py-3'>Sign in with Google</p>
                        </div>
                        <div className=' flex justify-center items-center'>
                            <p className='font-small text-gray-700 italic text-base'>Already have an account?</p>
                            <Link to='/login'>
                                <button className='font-medium text-gray-950 cursor-pointer ml-2'>Log In</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 hidden sm:block">
                <img src={ images.login }  alt="login visual" />
            </div>
        </div>
    </div>
    
  )
}

export default Registration
