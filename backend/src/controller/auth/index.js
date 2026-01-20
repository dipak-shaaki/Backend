import { createUser, getUserByEmail, loginUser } from "../../services/user/index.js";
import { generateJWTToken, verifyPassword } from "../../utils/auth.js";
import { httpError } from "../../utils/httpError.js";

//this is for the signup
const signUpController = async (req, res, next) => {
    try {
        const { name, email, password, type } = req.body;
        if (!name || !email || !password) {
            return next(httpError('Name, Email and password are required.', 400))
        }
        const existingUser = await getUserByEmail(email)

        if (existingUser) {
            return next(httpError('User with this email already exists', 400))
        }
        const user = await createUser({ name, email, password, type })
        res.status(200).json({ success: true, message: 'User Signed Up', data: user })
    } catch (error) {
        console.error('Signup error:', error)
        return next(httpError('An error occurred during signup', 500))
    }
}



//this is the login 
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for email:', email)

        if (!email || !password) {
            return next(httpError('Email and Password are required', 400))
        }

        const user = await getUserByEmail(email)
        console.log('User found:', user ? 'yes' : 'no')

        if (!user) {
            return next(httpError('User not found', 404))
        }

        // Ensure we have the password field from Sequelize object
        const userPassword = user.password || (user.toJSON && user.toJSON().password)

        const passwordMatched = await verifyPassword(password, userPassword)
        console.log("Password matched:", passwordMatched)

        if (!passwordMatched) {
            return next(httpError('Invalid Password', 400))
        }

        const jwtToken = generateJWTToken(user)

        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'strict',
        })

        res.status(200).json({ success: true, message: 'User logged in', data: { id: user.id, name: user.name, email: user.email, type: user.type } })
    } catch (error) {
        console.error('Login error:', error)
        return next(httpError(error.message || 'An error occurred during login', 500))
    }
}

export { signUpController, loginController }


