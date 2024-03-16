import expressAsyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";
import Role from '../models/roleModel.js'

const getRoles = expressAsyncHandler(async (req, res) => {
    try {
        const roles = await Role.find({ deletedAt: null })
        return res.status(200).json(roles)
    } catch (error) {
        return res.status(404);
        throw new Error("Fetching Failed ")
    }
})
const registerRole = expressAsyncHandler(async (req, res) => {
    try {
        await Role.create(req.body)
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})
const getRole = expressAsyncHandler(async (req, res) => {

    const role = await Role.findById()
    return res.status(200).json(role)
})

const updateRole = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await Role.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'role Updated successfully ', updates })
    } catch (error) {
        return res.status(400).json({ message: 'role Updated failed ' })
    }
})
const deleteRole = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await Role.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: ' deleted successfully ', deleted })
    } catch (error) {
        return res.status(404);
        console.log(error)
        throw new Error("deletion Failed ")
    }
})

export {
    getRole, getRoles,updateRole,deleteRole, registerRole
}