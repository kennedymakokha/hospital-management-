import expressAsyncHandler from "express-async-handler"
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs';
import generateToken from "../utils/generateToken.js";


const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
    res.status(200).json({ message: 'Auth User' })
})
const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, phone, email, password, confirm_password } = req.body
    const UserExists = await User.findOne({ email })
    if (UserExists) {
        throw new Error('User Already Exists')
    }

    let user = await User.create({
        name, phone, email, password
    })
    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        })
    } else {
        res.status(400)
        throw new Error("Invalid User Data")
    }
    res.status(200).json({ message: 'register User' })
})
const getUserProfile = expressAsyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone
    }
    res.status(200).json(user)
})
const logoutUser = expressAsyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'logged out  User' })
})

const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.phone = req.body.phone || user.phone

        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,
            name: updatedUser.name,
            phone: updatedUser.phone
        })

    } else {
        res.status(404);
        throw new Error("User Not Found")
    }

})

export {
    authUser, updateUserProfile, registerUser, logoutUser, getUserProfile
}