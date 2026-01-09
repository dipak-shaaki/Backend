const bcrypt = require('bcryptjs');


const encryptPassword=async (password)=>{
     const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(userData.password, salt);
        userData.password = hashedPassword;
        return hashedPassword;
}

const verifyPassword=async (inputPassword, storedPassword)=>{
    return await bycrypt.compare(inputPassword,storedPassword);

}

module.exports={
    encryptPassword,
    verifyPassword,
}