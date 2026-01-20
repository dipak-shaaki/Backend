import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
//to encrypt the password
const encryptPassword=async(password)=>{
   const salt=await bcrypt.genSalt(10)
   const hashedPassword=await bcrypt.hash(password,salt)
   return hashedPassword
}

const verifyPassword=async(inputPassword,storedHashedPassword)=>{
     return await bcrypt.compare(inputPassword,storedHashedPassword)
}

const generateJWTToken=(user)=>{
    const token=jwt.sign(
        {
            id:user.id,
            email:user.email,
            type:user.type
        },
        process.env.JWT_SERCRET,
        {
            expiresIn:process.env.JWT_EXPIRES_IN || '1d',
        }
    );
    return token
}

const verifyToken=(token)=>{
    try{
        const decoded=jwt.verify(token,process.env.JWT_SERCRET)
        return decoded
    }catch(error){
        return null
    }
}

export {encryptPassword,verifyPassword,generateJWTToken,verifyToken}
