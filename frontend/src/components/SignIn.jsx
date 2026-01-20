import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../services/auth'

const SignInComponent = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(false)
  const { login } = useAuth()

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) return null
    setIsLoading(true)
    setError(null)
    try {
      const data = await login(form)
      data.type === 'vendor' ? navigate('/vendor') : navigate('/')

    } catch (error) {
      console.error('Failed to sign in, please check your credentials')
    }
  }

  return (
    <>
      <div >


        <h1 className='text-center p-5 text-4xl font-bold'>Sign In </h1>
        {error && <p>Error:{error}</p>}
        <form onSubmit={handleSubmit}
          className='flex flex-col justify-center items-center gap-4'>

          <input type="email" placeholder='email' value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className='border w-80 rounded-md' />

          <input type="password" placeholder='enter your password' value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className='border w-80 rounded-md' />

          <button type='submit' disabled={isLoading} className='bg-red-400 text-white text-xl px-4 rounded-md'>
            {isLoading ? 'Signin In.....' : 'SignIn'}
          </button>
        </form>
      </div>
    </>
  )
}

export default SignInComponent
