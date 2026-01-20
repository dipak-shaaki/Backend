import { createProduct, getAllProducts, getProductsById, updateProducts,  } from "../../services/products/index.js"
import { httpError } from "../../utils/httpError.js"
import { verifyOwner } from "../../utils/product.js"


//This is for the vendor 
const createProductController=async(req,res)=>{
    const {name,description,price,categories,image}=req.body 
    if(!name || !price){
        return next(httpError('Name and price are required',400))
    }
    const product= await createProduct({name,description,price,categories,image,vendorid:req.user.id})
    res.status(200).json({success:true,message:'Product created successfully',data:product})

}

const getProductControllerForVendor=async(req,res)=>{
    const {limit,page}=req.query;
    const products=await getAllProducts({vendorid: req.user.id},limit,page)
    
    res.status(200).json({success:true,message:'Product fetched successfully For Vendor',data:products})
}


const getSingleProductControllerForVendor=async(req,res)=>{
    const {id}=req.params 
    const products=await getProductsById(id)
    if(!products) return next(httpError('Product not found',403))
        res.status(200).json({success:true,message:'Single Product fetched successfully for vendor',data:products})
}


const updateProductController = async (req, res, next) => {
        const { id } = req.params;
        const vendorId = req.user.id;
        const updates = req.body;

        // Fetch product
        const product = await getProductsById(id)
        if (!product) return next(httpError('Product not found', 403));
        

        // Check ownership
        const isOwner=await verifyOwner(product,vendorId)
        if(!isOwner) return next(httpError('Unauthorized:You can only update your own products',403)) 
      
        //allowed fields
        // const updatedValue=await updateProducts(product,updates)
        const updateProduct=await updateProducts(product,updates)
        if(!updateProduct) return next(httpError('Error occur while updating the error',403))
        
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: updateProduct
        });
    } 

const deleteProductController=async(req,res,next)=>{
    const {id}=req.params 
    const vendorId=req.user.id

    const product=await getProductsById(id)
    if(!product) return next(httpError('Product not found',404))
    
    const isOwner=await verifyOwner(product,vendorId)
    if(!isOwner) return next(httpError('Unauthorized:You can only delete your own products',403)) 
    
    await product.destroy()
    
    res.status(200).json({success:true,message:'Product deleted Successfully'})
    
}


//This is for the customer 
const getProductsControllerForUser=async(req,res)=>{
   const {limit,page}=req.query 
   const products= await getAllProducts({},limit,page)
   res.status(200).json({success:true,message:"Product fetched successfully for Customer",data:products})
}

const getSingleProductForCustomer=async(req,res)=>{
    const {id}=req.params 
    const products=await getProductsById(id)
    if(!products) return next(httpError('Product not found',403))
    res.status(200).json({success:true,message:'Single Product fetched successfully for customer',data:products})

}




export {createProductController,getProductControllerForVendor,getProductsControllerForUser,updateProductController,deleteProductController,getSingleProductControllerForVendor,getSingleProductForCustomer}