const jwt = require('jsonwebtoken')
const User = require('./../src/models/userModel')
const AppError = require('./../src/utils/appError')

exports.verify = async (req, res, next) => {
    try {
        // 1) getting token and check its there
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            return next(new AppError('You are not logged in! Please login to get access', 401))
        }
        const token = req.headers.authorization.split(' ')[1];

        // 2) validate token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // 3) check if user still exist
        const user = await User.findById(decoded.id);
        if (!user) {
            return next(new AppError('the user belonging to this token does o longer exist', 401))
        }

        // 4) grant access to protected routes
        req.user = user;
        next()
    } catch (err) {
        next(err)
    }
}

exports.restrictTo = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError("You do not have permission to perform this task", 403))
        }
        next()
    }
}