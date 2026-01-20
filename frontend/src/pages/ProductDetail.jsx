import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getIndiviProduct } from '../services/productIndivi'

const ProductDetail = () => {
    const productId=useParams()
    console.log('product Id is:',productId)
   const [productIndi,setProductIndi]=useState([])
   const [isLoading,setIsLoading]=useState(true)
   const [error,setError]=useState(null)
   
   useEffect(()=>{
    const findIndiviProduct=async()=>{
        try{
           const product=await getIndiviProduct(productId)
           console.log('Individual product list:',product)
        }catch(error){
            setError(error)
        }finally{
            setIsLoading(false)
        }
    }
    findIndiviProduct()
   },[])
  
if(isLoading) return <div>Loading.... </div>
if(error) return <div>Error:{error} </div>
  return (
    <>
     <h1>This is Product Details</h1>
    </>
  )
}

export default ProductDetail
