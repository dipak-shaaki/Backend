import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

const verifyPassword = async (inputPassword, storedHashedPassword) => {
    return await bcrypt.compare(inputPassword, storedHashedPassword)
}

const generateJWTToken = (user) => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            type: user.type
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d',
        }
    );
    return token
}

const verifyJWTToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export {
    encryptPassword,
    verifyPassword,
    generateJWTToken,
    verifyJWTToken,
}