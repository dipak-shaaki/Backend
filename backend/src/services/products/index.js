import { Product } from "../../model/products.js"

const createProduct=async(productData)=>{
    try{
        const product=await Product.create({...productData})
        return product 
    }catch(error){
        console.error('Error creating user',error)
    }
}

const getAllProducts=async(attr,l,p)=>{
    const limit = l ? l : null;
    const offset = l ? (p-1) * l : null;
    try{
       const products=await Product.findAll({where:attr,limit,offset})
       return products
    }catch(error){
        console.log('Error fetching the data',error)
    }
}


const getProductsById=async(id)=>{
    try{
        const product=await Product.findByPk(id)
        return product 
    }catch(error){
        console.error('Error fetching the data by Id',error)
        throw error
    }
}

const updateProducts=async(product,updatedData)=>{
    const finalData= await product.update(updatedData)
    return finalData
}

export {createProduct,getAllProducts,getProductsById,updateProducts}