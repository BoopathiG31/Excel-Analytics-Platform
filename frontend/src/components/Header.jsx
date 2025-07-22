import React from 'react'
import { AiOutlineLogout } from "react-icons/ai";
import { images } from '../assets/assets'
import { logoutUser } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
    const {user, isAuthenticated } = useSelector((state) => state.auth);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("Header user:", user);
    console.log("Header authentication:", isAuthenticated)

    const handleLogout = () =>{
        dispatch(logoutUser());
        navigate("/login");
    }

  return (
    <header className='mx-auto sm:flex justify-between items-center bg-gradient-to-r from-start to-yellow-400 sticky top-0 py-6 pr-2 z-50'> 
        <div className="hidden sm:block flex flex-col  flex-1">
            <h1 className='text-grey-900 text-md sm:text-2xl '>Welcome to Excel Platform</h1>
            <p className='text-gray-500'>Hello {isAuthenticated ? user?.username : "Guest"}, welcome back</p>
        </div> 
        <div className="flex  sm:flex justify-end items-center gap-2">
            <button className='cursor-pointer'>
                <img 
                    src={images.profile} 
                    alt="" 
                    className='w-6 h-6 sm:w-8 sm:h-8 rounded object-cover border-indigo-400'
                />
            </button>
            
            {isAuthenticated ? (
                <button className='text-red-100  bg-gray-950 backdrop-blur-md rounded cursor-pointer p-1 sm:px-3 sm:py-2 flex items-center gap-2'
                    onClick={handleLogout}
                >
                    Logout
                    <AiOutlineLogout className='text-red-100 size-4'/>
                </button>
                ) : ( 
                    <Link to="/login" className='text-red-100 bg-gray-950 rounded-xl cursor-pointer p-1 sm:px-3 sm:py-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all' >Login</Link>
                  
                )}
        </div>
    </header>
  )
}

export default Header
