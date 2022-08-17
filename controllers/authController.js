const User = require("../model/User");
const { userToken } = require("../utils/jwt_utility");
const CustomError = require("../errors/index");
const { StatusCodes } = require("http-status-codes");



const singUp = async(req, res) => {
    //instead of sending req.body directly we are going to put it inside variables , so the user cant add a role value as admin
    const { email, password, name } = req.body
    const user = await User.create({ email, password, name });
    const tokenUser = { name: user.name, userID: user._id, };
    const token = userToken({ payload: tokenUser });
    res.status(StatusCodes.CREATED).json({ token: token, tokenUser });

};



const login = async(req, res) => {
    console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError.BadRequestError("Please Provide email and password");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }

    const pwdMatch = await user.comparePasswords(password);

    if (!pwdMatch) {
        throw new CustomError.UnauthenticatedError("Please Provide email and password");
    }

    const tokenUser = { name: user.name, userID: user._id, };
    const token = userToken({ payload: tokenUser });
    res.status(StatusCodes.OK).json({ token: token, tokenUser });
}

module.exports = { singUp, login }