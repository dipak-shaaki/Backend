const userService = require('../../service/user');
const { verifyPassword } = require('../../utils/auth');



const signupController = async (req, res) => {
    try {
        const { name, email, password, type } = req.body;

        const user = await userService.createUser({ name, email, password, type });

        res.status(201).json({
            success: true,
            message: 'User Signed up successfully',
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: user
        });
    } catch (error) {
        console.error(error);
        const status = error.message === 'user not found' || error.message === 'Invalid Password' ? 400 : 500;
        return res.status(status).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};

module.exports = {
    signupController,
    loginController,
};