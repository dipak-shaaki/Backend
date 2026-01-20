import { useNavigate } from "react-router-dom"

const ProductListC = ({ product }) => {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/products/${product.id}`)
  }

  return (
    <div className='h-full'>
      <div className='bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col'>
        {/* Image Container */}
        <div className='bg-gradient-to-b from-gray-200 to-gray-300 h-48 flex items-center justify-center overflow-hidden'>
          {product.image ? (
            <img src={product.image} alt={product.name} className='w-full h-full object-cover' />
          ) : (
            <div className='text-gray-400 text-center'>
              <p className='text-sm'>Image:</p>
              <p className='text-xs'>{product.image || 'No Image'}</p>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className='p-4 flex-grow flex flex-col justify-between'>
          <div>
            <p className='text-xs text-gray-500 mb-2'>
              Category: <span className='font-semibold text-gray-700'>{product.categories || 'General'}</span>
            </p>
            <h3 className='text-lg font-bold text-gray-800 mb-2 line-clamp-2'>
              {product.name}
            </h3>
            {product.description && (
              <p className='text-sm text-gray-600 mb-3 line-clamp-2'>
                {product.description}
              </p>
            )}
          </div>

          {/* Price and Button */}
          <div>
            <div className='mb-4 flex items-end justify-between'>
              <span className='text-2xl font-bold text-red-500'>
                ₹{product.price}
              </span>
              {product.instock !== undefined && (
                <span className={`text-xs px-2 py-1 rounded ${product.instock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {product.instock ? 'In Stock' : 'Out of Stock'}
                </span>
              )}
            </div>
            <button
              onClick={handleViewDetails}
              className='w-full bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-2 text-white font-semibold transition-colors duration-200'
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductListC
