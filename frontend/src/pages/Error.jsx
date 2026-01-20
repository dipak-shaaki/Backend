import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate=useNavigate()
  return (
   <>
      <div className='flex flex-col  justify-center items-center gap-5'>
           <h1 className='text-8xl text-red-600  mt-10'>404 page not loaded</h1>
       <button onClick={()=>navigate('/')} className='text-2xl font-bold bg-fuchsia-100 px-2 rounded-xl'>Return to Home Page</button>
      </div>
      
   </>
  )
}

export default Error
