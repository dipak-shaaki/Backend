import  { useEffect, useState } from 'react'
import {getProductList} from '../services/productApi.js'
import ProductListC from '../components/ProductListC.jsx'
import Navbar from '../components/Layout/Navbar.jsx'
const ProductList = () => {
  const [product, setProduct] = useState([])
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)
 
  
  useEffect(() => {
    const fetchProducts=async ()=>{
      try{
      const result= await getProductList()
      console.log('productdata:',result)
      setProduct(result.data)
    }catch(error){
      setError(error.message)
    }finally {
      setLoading(false)
    }
    }
    fetchProducts()
  }, [])

if(loading) return <div> Loading...</div>

  if (error) return <div>Error:{error}</div>
  

  return (
    <div>
      <ul className='mx-auto container grid grid-cols-1   sm:grid-cols-2 gap-3 md:grid-cols-3'>
        {
          product.map((product)=>{
            return <li key={product.id}>
              <ProductListC product={product}/>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default ProductList
