
import { verifyToken } from "../utils/auth.js";
import { httpError } from "../utils/httpError.js";
const isProtectedRoute=(req,res,next)=>{
    
    const {token}=req.cookies;
    if(!token){
        return next(httpError('Unauthorized: No token provided',403))
    }
    // console.log('token:',token);
    const userData=  verifyToken(token)
    if (!userData){
        return next(httpError('Unauthorized: Invalid token',403))
    }
    console.log('User Data from Token',userData)
    req.user=userData
    next()
}

const isVendor=(req,res,next)=>{
    if(req.user.type!=='vendor'){
        return next(httpError('Forbidden:Access is allowed for vendors only',403))  
    }
    next()
}

const isCustomer=(req,res,next)=>{
    if(req.user.type!=='customer'){
        return next(httpError('Forbidden:Access is allowed for customer only',403))  
    }
    next()
}
export {isProtectedRoute,isVendor,isCustomer}