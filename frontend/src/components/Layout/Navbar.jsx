import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { user, login, logout } = useAuth()
  return (
    <>
      <div className='bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg sticky top-0 z-50'>
        <nav className='flex justify-between items-center px-6 py-4 max-w-7xl mx-auto'>
          <Link to='/' className='text-3xl font-bold text-white hover:text-gray-100 transition-colors duration-200'>
            🛍️ Ecommerce
          </Link>
          <div className='hidden md:flex items-center gap-8'>
            {!user && (
              <div className='flex gap-4 font-semibold'>
                <Link to='/productlist' className='px-3 py-2 text-gray-800 hover:text-white hover:bg-amber-600 rounded-lg transition-all duration-200' >
                  ProductList
                </Link>
                <Link to='/help' className='px-3 py-2 text-gray-800 hover:text-white hover:bg-amber-600 rounded-lg transition-all duration-200'>
                  Help & Support
                </Link>
                <Link to='/login' className='px-3 py-2 text-gray-800 hover:text-white hover:bg-amber-600 rounded-lg transition-all duration-200'>
                  Login
                </Link>
                <Link to='/signup' className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold'>
                  Sign Up
                </Link>
              </div>
            )}

            <div className='flex gap-4 items-center'>
              {user && user.type === 'customer' && (
                <Link to='/cart' className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 font-semibold flex items-center gap-2'>
                  🛒 My Cart
                </Link>
              )}

              {user && (
                <div className='flex items-center gap-3'>
                  <span className='text-gray-800 font-medium'>{user.email}</span>
                  <button onClick={logout} className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold'>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar
