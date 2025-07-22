import React, { useState } from 'react'
import SideBar from './SideBar'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
  return (
    <>
        <div className="">
            <SideBar/>
            <div className='flex-1 ml-16 md:ml-52 transition-all duration-300'>
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className='mx-auto'>
                    <Outlet/>
                </main>   
            </div>
        </div> 
      
    </>
  )
}

export default Layout
