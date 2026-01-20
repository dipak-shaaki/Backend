import React from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { Outlet } from 'react-router-dom'

const Mainlayout = () => {
  return (
   <>
      <Navbar/>
      <div className='min-h-screen'>
         <Outlet/>
      </div>
        
      <Footer/>
   </>
  )
}

export default Mainlayout
