const User = require('../../model/user');
const bycrypt = require('bcryptjs');
const { encryptPassword } = require('../../utils/auth');

const createUser = async (userData) => {
    try {
    //    userData.password = await bycrypt.hash(userData.password);
    const created =(await User.create({
        ...userData, password:await encryptPassword(userData.password)})).toJSON();
       
        // const created = await User.create(userData);
        // const userJson = created.toJSON();
        // const { password, ...userWithoutPassword } = userJson;
        return userWithoutPassword;
    } catch (error) {
        // let message = error.message;
        // if (error.errors && Array.isArray(error.errors)) {
        //     message = error.errors.map(e => e.message).join('; ');
        // }
        throw new Error('Error creating user: ' + message);
    }
};


const loginUser = async (email, password) => {

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('user not found');
        }
        const isPasswordValid = await bycrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid Password');

        }
        const userData = user.toJSON();
        const { password: pwd, ...userWithoutPassword } = userData;
        return userWithoutPassword;


    } catch (error) {
        // Rethrow so callers can handle the error
        throw new Error(error.message || 'Error logging in');
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return null;
        }
        return user;

    } catch (error) {
        console.log("error fetching email ", error);
    }
};


module.exports = {
    createUser,
    loginUser,
};