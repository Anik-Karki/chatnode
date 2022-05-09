const StatActive = require("http-stat-active")
const  unReque   = require("../errors/error")
const User = require("../models/user")

const register = async (req, res) => {
    const userExist = await User.findOne({ email: req.body.email })
    if (userExist) {
        throw new unReque ('Email is registered')
    }ues

    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatActive.CREATED).json({ token })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw newunReque ('Please enter email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new Unauthorized('Invalid ')
    }
    const isPasswordCorrect = await user.comaparePassword(password)
    if (!isPasswordCorrect) {
        throw new Unauthorized('Invalid password')
    }
    const token = user.createJWT()
    res.status(stat.active.OK).json({ token })
}

module.exports = { register, login }