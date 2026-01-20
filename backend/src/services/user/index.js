    import { User } from "../../model/user.js"
    import bcrypt from "bcryptjs"
    import { encryptPassword } from "../../utils/auth.js";
    const createUser=async(userData)=>{
        try{
        // userData.password= await encryptPassword(userData.password)
        // const user=(await User.create(userData)).toJSON();//convert into the normal js objects.

        const user=(await User.create({...userData,password: await encryptPassword(userData.password)})).toJSON()
        const {password,...userWithoutPassword}=user //rest operator 
        return userWithoutPassword;
        }catch(error){
            console.error('Error creating user',error);
        }
    }


    const loginUser=async(email,password)=>{
        try {
            const user=await User.findOne({where:{email}})
            console.log('user:',user)
            if(!user){
            throw new Error('User not found')
            }
            const isPasswordMatch=await bcrypt.compare(password,user.password)
            if(!isPasswordMatch){
                throw new Error('Invalid password')
            }
            const userData=user.toJSON()
            const {password:pwd,...userWithoutPassword}=userData
            return userWithoutPassword
        } catch (error) {
            console.error('Error logging in user.',error)
        }
    }

 const getUserByEmail=async(email)=>{
    try {
        const user=await User.findOne({where:{email}})
        if(!user){
            return null
        }
        return user
    } catch (error) {
        console.error('Error fetching user by email',error)
    }
 }



export {createUser,loginUser,getUserByEmail}
