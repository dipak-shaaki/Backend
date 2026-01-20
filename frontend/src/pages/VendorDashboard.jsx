import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AddProductModal from '../components/AddProductModal'

const VendorDashboard = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (!user || user.type !== 'vendor') {
            navigate('/login')
            return
        }
        fetchVendorProducts()
    }, [user, navigate])

    const fetchVendorProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_URL}/vendor/products`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            if (response.ok) {
                setProducts(data.data || [])
            } else {
                setError(data.message || 'Failed to load products')
            }
        } catch (err) {
            setError(err.message)
            console.error('Error fetching products:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleProductAdded = (newProduct) => {
        setProducts([...products, newProduct])
        setShowModal(false)
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/vendor/products/${productId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (response.ok) {
                setProducts(products.filter(p => p.id !== productId))
                alert('Product deleted successfully')
            } else {
                const data = await response.json()
                alert(data.message || 'Failed to delete product')
            }
        } catch (err) {
            alert('Error deleting product: ' + err.message)
        }
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Header */}
            <div className='bg-white shadow'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                    <div className='flex justify-between items-center'>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-900'>Vendor Dashboard</h1>
                            <p className='text-gray-600 mt-2'>Welcome, {user?.name}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors'
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Add Product Button */}
                <div className='mb-8'>
                    <button
                        onClick={() => setShowModal(true)}
                        className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold'
                    >
                        + Add New Product
                    </button>
                </div>

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
                            <p className='text-gray-600'>Loading products...</p>
                        </div>
                    </div>
                ) : products.length === 0 ? (
                    <div className='bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-12 rounded-lg text-center'>
                        <p className='text-lg font-semibold mb-2'>No products yet</p>
                        <p className='mb-4'>Start by adding your first product</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className='bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors'
                        >
                            Add Product
                        </button>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {products.map((product) => (
                            <div key={product.id} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'>
                                {/* Product Image */}
                                <div className='bg-gray-200 h-48 flex items-center justify-center overflow-hidden'>
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className='w-full h-full object-cover' />
                                    ) : (
                                        <div className='text-gray-400 text-center'>No Image</div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className='p-4'>
                                    <h3 className='font-bold text-lg text-gray-900 mb-2 line-clamp-2'>
                                        {product.name}
                                    </h3>
                                    <p className='text-gray-600 text-sm mb-3 line-clamp-2'>
                                        {product.description}
                                    </p>

                                    <div className='flex justify-between items-center mb-4'>
                                        <span className='text-2xl font-bold text-blue-600'>₹{product.price}</span>
                                        <span className='text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded'>
                                            Stock: {product.instock || 0}
                                        </span>
                                    </div>

                                    <p className='text-xs text-gray-500 mb-4'>
                                        Category: {product.categories?.join(', ') || 'N/A'}
                                    </p>

                                    {/* Actions */}
                                    <div className='flex gap-2'>
                                        <button
                                            onClick={() => alert('Edit feature coming soon')}
                                            className='flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold'
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className='flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold'
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Product Modal */}
            {showModal && (
                <AddProductModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onProductAdded={handleProductAdded}
                />
            )}
        </div>
    )
}

export default VendorDashboard
