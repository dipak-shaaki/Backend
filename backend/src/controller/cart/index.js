// import { createCart, getCartById, updateCarts } from "../../services/cart/index.js"
// import { verifyCustomer } from "../../utils/cart.js"
// import { httpError } from "../../utils/httpError.js"


// const createCartController=async(req,res,next)=>{

//    const cart=await createCart({user_id:req.user.id,item_id:req.params.id})
//    if(!cart) return next(httpError('Card is not available:',403))

//     res.status(200).json({success:'true',message:'Card Created Successfully',data:cart})
// }


// const updateCartController=async(req,res,next)=>{
//     const {id}=req.params
//     const updates=req.body

//     const cart =await getCartById(id)

//     if(!cart) return next(httpError('Card is not available',403))
    
//     const updatecart=await updateCarts(cart,updates)
//     if(!updatecart) return next(httpError('Error occur while updating the card',403))

//     res.status(200).json({success:true,message:'Cart updated successfully',data:updatecart})
// }


// const deleteCartController=async(req,res,next)=>{
//     const {id}=req.params 

//     const cart =await getCartById(id)
//     console.log('cart',cart )
//     if(!cart) return next(httpError('Error occur while deleting the card',403))

//     const isCustomer= verifyCustomer(cart,req.user.id)
//     if(!isCustomer) return next(httpError('Unauthorized:You can only delete your item',403))
    
//     await cart.destroy()

//     res.status(200).json({success:true,message:'Cart successfully deleted'})
    
// }

// export {createCartController,updateCartController,deleteCartController}

import { createCart, deleteCart, findSingleCart, updateCart } from "../../services/cart/index.js"

const upsertCartController=async(req,res)=>{
    const cartData=req.body 
    
    const cart= await findSingleCart(
        cartData.cartId 
        ? {id:cartData.cartId,status:'pending'}
        : {item_id:cartData.item_id, user_id:req.user.id, status:'pending'}
    )

    if(!cart){
        const newCart =await createCart ({item_id:cartData.item_id, user_id:cartData.user_id})
        return res.status(200).json({success:true, message:'Cart created Successfully', data:newCart})
    }

    const isDeleting=cartData.dec && cart.no_of_item===1 
    if(isDeleting){
        await deleteCart({id:cart.id})
        return res.status(200).json({success:true,message:'Cart item deleted successfully'})
    }

    await updateCart(cart.id,{no_of_item:cartData.dec? cart.no_of_item-1 :cart.no_of_item+1})
    return res.status(200).json({success:true, message:'Cart updated Successfully'})
}

export {upsertCartController}