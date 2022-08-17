const CustomError = require('../errors');
const { verfifyToken } = require('../utils/jwt_utility');

const authenticateUser = async(req, res, next) => {
    const token = req.headers.token;
    console.log(token);

    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
    try {
        const { name, userID } = verfifyToken({ token });
        req.body.userId = userID,
            console.log(userID);
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
};

module.exports = authenticateUser;