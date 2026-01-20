import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const CustomerDashboard = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!user || user.type !== 'customer') {
            navigate('/login')
            return
        }
        fetchCustomerCart()
    }, [user, navigate])

    const fetchCustomerCart = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            if (response.ok) {
                setCart(data.data || [])
            } else {
                setError(data.message || 'Failed to load cart')
            }
        } catch (err) {
            setError(err.message)
            console.error('Error fetching cart:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const handleRemoveFromCart = async (itemId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/cart/${itemId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (response.ok) {
                setCart(cart.filter(item => item.id !== itemId))
                alert('Item removed from cart')
            } else {
                const data = await response.json()
                alert(data.message || 'Failed to remove item')
            }
        } catch (err) {
            alert('Error: ' + err.message)
        }
    }

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.no_of_item), 0).toFixed(2)
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Header */}
            <div className='bg-white shadow'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-900'>Customer Dashboard</h1>
                            <p className='text-gray-600 mt-2'>Welcome, {user?.name}</p>
                        </div>
                        <div className='flex gap-4'>
                            <button
                                onClick={() => navigate('/productlist')}
                                className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                            >
                                Shop Products
                            </button>
                            <button
                                onClick={handleLogout}
                                className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors'
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6'>My Shopping Cart</h2>

                {/* Error Message */}
                {error && (
                    <div className='bg-red-100 text-red-700 p-4 rounded-lg mb-6'>
                        {error}
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className='flex justify-center items-center h-64'>
                        <div className='text-center'>
                            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
                            <p className='text-gray-600'>Loading cart...</p>
                        </div>
                    </div>
                ) : cart.length === 0 ? (
                    <div className='bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-12 rounded-lg text-center'>
                        <p className='text-lg font-semibold mb-2'>Your cart is empty</p>
                        <p className='mb-4'>Start shopping to add items to your cart</p>
                        <button
                            onClick={() => navigate('/productlist')}
                            className='bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors'
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                        {/* Cart Items */}
                        <div className='lg:col-span-2'>
                            <div className='bg-white rounded-lg shadow-md overflow-hidden'>
                                <table className='w-full'>
                                    <thead className='bg-gray-100 border-b'>
                                        <tr>
                                            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Product</th>
                                            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Price</th>
                                            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Quantity</th>
                                            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Total</th>
                                            <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item) => (
                                            <tr key={item.id} className='border-b hover:bg-gray-50'>
                                                <td className='px-6 py-4'>
                                                    <div>
                                                        <p className='font-semibold text-gray-900'>{item.name}</p>
                                                        <p className='text-xs text-gray-500'>{item.description}</p>
                                                    </div>
                                                </td>
                                                <td className='px-6 py-4'>
                                                    <p className='text-gray-900'>₹{item.price}</p>
                                                </td>
                                                <td className='px-6 py-4'>
                                                    <p className='text-gray-900'>{item.no_of_item}</p>
                                                </td>
                                                <td className='px-6 py-4'>
                                                    <p className='font-semibold text-gray-900'>₹{(item.price * item.no_of_item).toFixed(2)}</p>
                                                </td>
                                                <td className='px-6 py-4'>
                                                    <button
                                                        onClick={() => handleRemoveFromCart(item.id)}
                                                        className='text-red-600 hover:text-red-800 font-semibold text-sm'
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Cart Summary */}
                        <div>
                            <div className='bg-white rounded-lg shadow-md p-6 sticky top-20'>
                                <h3 className='text-xl font-bold text-gray-900 mb-4'>Order Summary</h3>

                                <div className='space-y-3 mb-6 pb-6 border-b'>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-600'>Subtotal</span>
                                        <span className='font-semibold text-gray-900'>₹{calculateTotal()}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-600'>Shipping</span>
                                        <span className='font-semibold text-gray-900'>₹0</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-600'>Tax</span>
                                        <span className='font-semibold text-gray-900'>₹0</span>
                                    </div>
                                </div>

                                <div className='flex justify-between mb-6 text-lg'>
                                    <span className='font-bold text-gray-900'>Total</span>
                                    <span className='font-bold text-blue-600'>₹{calculateTotal()}</span>
                                </div>

                                <button className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold mb-3'>
                                    Checkout
                                </button>

                                <button
                                    onClick={() => navigate('/productlist')}
                                    className='w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold'
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomerDashboard
