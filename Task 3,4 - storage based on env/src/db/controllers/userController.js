const User = require('../models/userModel')

exports.validateUser = async (req, res, next, val) => {
    const userId = val
    try {
        const user = await User.findById(userId)
        next();
    } catch (err) {
        return res.status(404).json({
            status: 'fail',
            msg: 'User not found'
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            status: 'success',
            result: users.length,
            data: users
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            msg: err
        })
    }
}

exports.createUser = async (req, res) => {
    try {
        console.log(req.body)
        const newUser = await User.create(req.body)
        return res.redirect('/pages/user')      //use if using ejs only
        // res.status(201).json({
        //     status: 'success',
        //     data: newUser
        // });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            msg: 'Invalid data sent'
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,       //this will return new updated document
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            msg: 'User updated Successfully',
            data: user
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            msg: err
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            msg: 'User deleted Successfully',
            data: user
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            msg: err
        });
    }
}
