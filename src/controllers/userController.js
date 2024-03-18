import expressAsyncHandler from "express-async-handler"
import User from '../models/userModel.js'
import Role from '../models/roleModel.js'
import Duty from '../models/dutyrosterModel.js'
import Station from '../models/stationsModel.js'
import bcrypt from 'bcryptjs';
import generateToken from "../utils/generateToken.js";



const authUser = expressAsyncHandler(async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ $or: [{ email: email }, { ID_no: email }] }).populate('role', 'name')
        if (user && (await user.matchPassword(password))) {
            let token = generateToken(res, user._id)
            await Duty.create({ token: req.body.token, user_id: user._id, role_id: user.role._id, start: Date(Date.now()) })
            await User.findOneAndUpdate({ $or: [{ email }, { ID_no: email }] }, { onduty: true }, { new: true, useFindAndModify: false })
            user.tokens.push(req.body.token)
            await User.findOneAndUpdate({ $or: [{ email }, { ID_no: email }] }, { tokens: user.tokens }, { new: true, useFindAndModify: false })
            return res.status(201).json({
                id: user._id,
                name: user.name,
                token: token,
                email: user.email,
                role: user?.role?.name,
                onduty: user.onduty,
                tokens: user.tokens
            })


        } else {

            return res.status(401).json({ message: "Invalid email or password" })

        }
    } catch (error) {
        return res.status(401).json({ message: "Invalid email or password" })

    }
})
const registerUser = expressAsyncHandler(async (req, res) => {
    try {
        const { name, phone, email, password, roleName, confirm_password } = req.body
        const UserExists = await User.findOne({ email })
        if (UserExists) {
            return res.status(401).json({ message: "User Exists" })
        }
        let role = await Role.findOne({ name: req.body.role })

        req.body.role = role._id
        req.body.createdBy = req?.user?._id
        await User.create(req.body)

    } catch (error) {

        return res.status(401).json({ message: error.message })

    }

})
const getUserProfile = expressAsyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone
    }
    return res.status(200).json(user)
})
const getUsers = expressAsyncHandler(async (req, res) => {
    if (req.query.searchKey) {
        var searchKey = new RegExp(`${req.query.searchKey}`, 'i')
        let packages = await User.find({
            deletedAt: null, $or: [
                { ID_no: searchKey },
                { name: searchKey },
                { name: searchKey }]
        }).sort({ createdAt: -1 }).limit(100)
        return res.status(200).json(packages);
    } else {
        const users = await User.find({})
            .populate('role', 'name').sort({ createdAt: -1 }).limit(100)
        return res.status(200).json(users)
    }
})
const getroleUsers = expressAsyncHandler(async (req, res) => {
    if (req.params.role === "all") {
        const users = await User.find({ deletedAt: null })
            .populate('role', 'name')
        return res.status(200).json(users)
    } else {
        let userRole = await Role.findOne({ name: req.params.role })
        const users = await User.find({ deletedAt: null, role: userRole._id })
            .populate('role', 'name')
        return res.status(200).json(users)
    }
})
const getUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
        .populate('role', 'name').populate('station', 'name')
    return res.status(200).json(user)
})
const logoutUser = expressAsyncHandler(async (req, res) => {
    try {
        await Duty.findOneAndUpdate({ user_id: req.body.id }, { end: Date(Date.now()) }, { new: true, useFindAndModify: false })
        await User.findOneAndUpdate({ _id: req.body.id }, { onduty: false }, { new: true, useFindAndModify: false })

        const user = await User.findOne({ _id: req.body.id })
        const index = user?.tokens.indexOf(req.body.token);
        if (index > -1) { // only splice array when item is found
            user?.tokens.splice(index, 1); // 2nd parameter means remove one item only
        }
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        })

        return res.status(200).json({ message: 'logged out  User' })
    } catch (error) {
        console.log(error)
    }
})

const EditUserDetails = expressAsyncHandler(async (req, res) => {
    try {
        let assign = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        if (req.body.station) {
            await Station.create({
                station_id: assign._id,
                user_id: req.params.id
            })
        }
        return res.status(200).json({ message: ' successfully ', assign })
    } catch (error) {
        return res.status(400).json({ message: ' failed ', error })
    }
})


const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        let updatte = await User.findOneAndUpdate({ _id: user._id }, req.body, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Updated', updatte })

    } else {
        return res.status(404);
        throw new Error("User Not Found")
    }

})

export {
    authUser, updateUserProfile, getroleUsers, EditUserDetails, registerUser, getUser, getUsers, logoutUser, getUserProfile
}