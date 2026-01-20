import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signUp } from '../services/auth'

const SignUp = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        type: 'customer'
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.name || !form.email || !form.password || !form.confirmPassword) {
            setError('All fields are required')
            return
        }

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (form.password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const response = await signUp({
                name: form.name,
                email: form.email,
                password: form.password,
                type: form.type
            })

            // Redirect to login after successful signup
            navigate('/login')
        } catch (err) {
            setError(err.message || 'Failed to sign up. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='max-w-md w-full bg-white rounded-lg shadow-md p-8'>
                <h1 className='text-center text-4xl font-bold mb-8'>Sign Up</h1>

                {error && <div className='bg-red-100 text-red-700 p-3 rounded-md mb-4'>{error}</div>}

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <input
                        type="text"
                        name="name"
                        placeholder='Full Name'
                        value={form.name}
                        onChange={handleChange}
                        className='border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400'
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder='Email'
                        value={form.email}
                        onChange={handleChange}
                        className='border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400'
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={form.password}
                        onChange={handleChange}
                        className='border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400'
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder='Confirm Password'
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className='border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400'
                    />

                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className='border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400'
                    >
                        <option value="customer">Customer</option>
                        <option value="vendor">Vendor</option>
                    </select>

                    <button
                        type='submit'
                        disabled={isLoading}
                        className='bg-red-400 text-white text-xl px-4 py-2 rounded-md hover:bg-red-500 disabled:opacity-50'
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className='text-center mt-4'>
                    Already have an account? <Link to='/login' className='text-red-400 hover:underline'>Sign In</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
