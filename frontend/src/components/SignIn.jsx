import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { signIn } from '../services/auth'

const SignInComponent = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { login } = useAuth()

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const data = await login(form)
      if (data.type === 'vendor') {
        navigate('/vendor')
      } else if (data.type === 'customer') {
        navigate('/customer')
      } else {
        navigate('/')
      }
    } catch (error) {
      setError(error.message || 'Failed to sign in. Please check your credentials.')
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-md p-8'>
        <h1 className='text-center text-4xl font-bold mb-8'>Sign In</h1>

        {error && (
          <div className='bg-red-100 text-red-700 p-3 rounded-md mb-4'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type="email"
            placeholder='Email'
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className='border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400'
          />

          <input
            type="password"
            placeholder='Password'
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className='border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400'
          />

          <button
            type='submit'
            disabled={isLoading}
            className='bg-red-400 text-white text-xl px-4 py-2 rounded-md hover:bg-red-500 disabled:opacity-50'
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className='text-center mt-4'>
          Don't have an account? <Link to='/signup' className='text-red-400 hover:underline'>Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default SignInComponent
