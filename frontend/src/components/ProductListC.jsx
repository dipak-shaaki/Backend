import { useNavigate } from "react-router-dom"

const ProductListC = ({product}) => {
    const navigate=useNavigate()
  return (
    <>
      <div className='mt-5  '>
        <div className=" space-y-5 rounded-2xl p-3   h-70 bg-gradient-to-b from-red-500 to-neutral-400">
        <span>Image: {product.image} </span>
        <h2>Categories: {product.categories} </h2>
        {/* <h3>Description: {product.description} </h3>
        <h2>InStock: {product.instock} </h2> */}
        <h3>Name: {product.name} </h3>
        <h1>Price: {product.price} </h1>
         <button  onClick={()=>navigate(`/products/${product.id}`)}
          className="bg-blue-500 rounded-2xl px-2 py-2 text-white">View All Details</button>
        </div>
        
      </div>
    </>
  )
}
export default ProductListC
