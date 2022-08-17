const jwt = require("jsonwebtoken")

const userToken = ({ payload }) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

const verfifyToken = ({ token }) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { userToken, verfifyToken };