const verifyOwner=async(product,vendorId)=>{
  try{
   const isOwner= (product.vendorid.toString()===vendorId)
   return isOwner
}catch(error){
    console.error('Not Eligible to update:',error)
}
}
export {verifyOwner}