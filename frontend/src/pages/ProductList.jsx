import { useEffect, useState } from 'react'
import { getProductList } from '../services/productApi.js'
import ProductListC from '../components/ProductListC.jsx'

const ProductList = () => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProductList()
        console.log('productdata:', result)
        setProduct(result.data || [])
      } catch (error) {
        setError(error.message)
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = product.filter(prod =>
    prod.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prod.categories?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-gray-600 text-lg'>Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 p-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='bg-red-100 text-red-700 p-4 rounded-lg'>
            <h3 className='font-bold'>Error Loading Products</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>All Products</h1>

          {/* Search Bar */}
          <input
            type="text"
            placeholder='Search by product name or category...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>

        {/* Results Count */}
        <div className='mb-6'>
          <p className='text-gray-600'>
            Showing <span className='font-semibold'>{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className='bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-12 rounded-lg text-center'>
            <h3 className='text-lg font-semibold mb-2'>No products found</h3>
            <p>Try adjusting your search or browse all products</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <ProductListC product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
