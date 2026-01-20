import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductListC from './ProductListC'
import { getProductList } from '../services/productApi'

const Hero = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProductList()
        setProducts(result.data || [])
      } catch (err) {
        setError(err.message)
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (error) {
    return (
      <div className='min-h-screen bg-gray-100 p-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='bg-red-100 text-red-700 p-4 rounded-lg'>
            Error loading products: {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Banner */}
      <div className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-4xl sm:text-5xl font-bold mb-4'>Welcome to Our Store</h1>
          <p className='text-lg text-blue-100 mb-8'>Discover amazing products at great prices</p>
          <button
            onClick={() => navigate('/productlist')}
            className='bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
          >
            Shop All Products
          </button>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='mb-12'>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>Featured Products</h2>
          <p className='text-gray-600'>Check out our latest and most popular items</p>
        </div>

        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
              <p className='text-gray-600'>Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className='bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-8 rounded-lg text-center'>
            <p className='text-lg'>No products available at the moment.</p>
            <p className='text-sm mt-2'>Please check back later!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {products.slice(0, 8).map((product) => (
              <div key={product.id}>
                <ProductListC product={product} />
              </div>
            ))}
          </div>
        )}

        {products.length > 8 && (
          <div className='text-center mt-12'>
            <button
              onClick={() => navigate('/productlist')}
              className='bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors'
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Hero
