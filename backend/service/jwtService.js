const jwt = require('jsonwebtoken')
const { checkCustomer, checkAdmins } = require('./authenticationService')
const dotenv = require('dotenv')
dotenv.config()

const gennerateAccessToken = async (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
    return accessToken
}

const gennerateRefreshToken = async (payload) => {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '365d' })
    return refreshToken
}

const refreshToken = (token) => {
    jwt.verify(token, process.env.REFRESH_TOKEN, async (err, customer) => {
        if (err) {
            resolve({ status: 'ERR', message: 'The authentication' })
        } else if (!customer) {
            resolve({ status: 'ERR', message: 'User not found' })
        } else {
            const access_token = await gennerateAccessToken({
                id: customer._id,
                isAdmin: checkAdmins(user.id)
            });
            resolve({ status: 'OK', message: 'SUCESS', access_token })
        }
    })
}
module.exports = {
    gennerateAccessToken,
    gennerateRefreshToken,
    refreshToken
}