// import { Cart } from "../../model/cart.js"

// const createCart=async(cartData)=>{
 
//     try{
//         const dbCart=await Cart.findOne({where:{user_id:cartData.user_id,item_id:cartData.item_id}})
//         if(dbCart){
//          dbCart.no_of_item+= 1
//          await dbCart.save()
//          return dbCart 
//         }else{
//          const cart=await Cart.create({...cartData})
//          return cart
//         }
//     }catch(error){
//         console.log('Error occur while creating the Cart:',error)
//     }
// }

// const getCartById=async(id)=>{
//   try{
//     const cart=await Cart.findByPk(id)
//     return cart 
//   }catch(error){
//      console.error('Cart is not available',error)
//   }
// }

//     const updateCarts=async(cart,updatedData)=>{
//         try{
//         const updatedcart=await cart.update(updatedData)
//         return updatedcart 
//         }catch(error){
//          console.error('Error occur while updating the cart:',error)
//         }
//     }

// export {createCart,getCartById,updateCarts}

 import { Cart } from "../../model/cart.js"

 const findSingleCart=async(query)=>{
    try{
        const cart= await Cart.findOne({where:query})
        return cart 
    }catch(error){
        console.error('Error fetching cart:',error)
    }
 }

 const createCart=async(cartData)=>{
    try{
        const cart=await Cart.create({...cartData})
        return cart 
    }catch(error){
        console.error('Error creating the cart:',error)
    }
 }


 const deleteCart=async(query)=>{
    try{
        const cart=await Cart.destroy({where:query})
        return cart 
    }catch(error){
        console.error('Error creating the cart:',error)
    }
 }

 const updateCart=async(cartId,updateData)=>{
    try{
        await Cart.update(updateData,{where:{id:cartId}})
    }catch(error){
        console.error('Error updating carts:',error)
    }
 }

 export {findSingleCart,createCart,deleteCart,updateCart}

