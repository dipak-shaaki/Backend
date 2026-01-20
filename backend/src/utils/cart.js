const verifyCustomer=(cart,customerid)=>{
    try{
        const isCustomer=(cart.user_id.toString()===customerid)
        return isCustomer
    }catch(error){
        console.error('Error occur while verifying the customer:',error)
    }
  
}
export {verifyCustomer}