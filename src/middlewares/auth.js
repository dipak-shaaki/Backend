
import { httpError } from '../utils/httpError.js';
import { verifyJWTToken } from '../utils/auth.js';

const isProtectedRoute = (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        throw httpError('Unauthorized access. Please log in.', 403);
    }

    const userData= verifyJWTToken(token)

    if (!userData){
        return next(httpError('',403));
    }

    req.user = userData;

    next();

};

const isCustomer=(req,res,next)=>{
    if (req.user.type !== 'customer'){
        return next(httpError('Access denied. Customers only.',403));
    }
    next();
}

const isVendor=(req,res,next)=>{    
    if (req.user.type !== 'vendor'){    
        return next(httpError('Access denied. Vendors only.',403));
    }
    next();
}

export { isProtectedRoute , isCustomer,isVendor};