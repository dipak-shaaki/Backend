import React, { useState } from 'react'

const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        categories: '',
        image: '',
        instock: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.name || !form.price || !form.description) {
            setError('Name, Price, and Description are required')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const productData = {
                name: form.name,
                description: form.description,
                price: parseFloat(form.price),
                categories: form.categories ? form.categories.split(',').map(c => c.trim()) : [],
                image: form.image,
                instock: parseInt(form.instock) || 0
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/vendor/products`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            })

            const data = await response.json()

            if (response.ok) {
                onProductAdded(data.data)
                setForm({
                    name: '',
                    description: '',
                    price: '',
                    categories: '',
                    image: '',
                    instock: ''
                })
                alert('Product added successfully!')
            } else {
                setError(data.message || 'Failed to add product')
            }
        } catch (err) {
            setError(err.message || 'Error adding product')
            console.error('Error:', err)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto'>
                {/* Header */}
                <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center'>
                    <h2 className='text-2xl font-bold text-gray-900'>Add New Product</h2>
                    <button
                        onClick={onClose}
                        className='text-gray-500 hover:text-gray-700 text-2xl'
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div className='p-6'>
                    {error && (
                        <div className='bg-red-100 text-red-700 p-3 rounded-lg mb-4'>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {/* Product Name */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-1'>
                                Product Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Enter product name"
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-1'>
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                placeholder="Enter product description"
                                rows="4"
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                        </div>

                        {/* Price and Stock */}
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-1'>
                                    Price (₹) *
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                    step="0.01"
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-semibold text-gray-700 mb-1'>
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    name="instock"
                                    value={form.instock}
                                    onChange={handleChange}
                                    placeholder="Enter stock quantity"
                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-1'>
                                Categories (comma separated)
                            </label>
                            <input
                                type="text"
                                name="categories"
                                value={form.categories}
                                onChange={handleChange}
                                placeholder="e.g., Electronics, Gadgets, Tech"
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-1'>
                                Image URL
                            </label>
                            <input
                                type="url"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="Enter image URL"
                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            />
                            {form.image && (
                                <div className='mt-2'>
                                    <img
                                        src={form.image}
                                        alt="Preview"
                                        className='h-32 w-32 object-cover rounded-lg'
                                        onError={(e) => {
                                            e.target.style.display = 'none'
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className='flex gap-4 pt-6 border-t'>
                            <button
                                type="button"
                                onClick={onClose}
                                className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold'
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50'
                            >
                                {loading ? 'Adding...' : 'Add Product'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProductModal
