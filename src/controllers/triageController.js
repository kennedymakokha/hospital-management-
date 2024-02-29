import expressAsyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";
import Triage from '../models/triageModel.js'

const getTries = expressAsyncHandler(async (req, res) => {
    try {
        const tries = await Triage.find({ deletedAt: null }).populate('user_id')
        res.status(200).json(tries)
    } catch (error) {
        res.status(404);
        throw new Error("Fetching Failed ")
    }
})
const registerTry = expressAsyncHandler(async (req, res) => {
    try {
        req.body.bloodPressure = {
            lowerValue: req.body.bp.split('/')[0],
            upperValue: req.body.bp.split('/')[1]
        },
            await Triage.create(req.body)
        res.status(200).json({ message: 'User Created' })
    } catch (error) {
        console.log(error)
    }
})
const getTryID = expressAsyncHandler(async (req, res) => {

    const user = await Triage.find({ user_id: req.params.id })
    console.log(user[user.length - 1])
    res.status(200).json(user[user.length - 1])
})
const getTriesByID = expressAsyncHandler(async (req, res) => {
    const user = await Triage.find({ user_id: req.params.id })
    res.status(200).json(user)
})
const updateTry = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await Triage.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        res.status(200).json({ message: 'Patient Updated successfully ', updates })
    } catch (error) {
        res.status(400).json({ message: 'Patient Updated failed ', updates })
    }
})
const deleteTry = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await Triage.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        res.status(200).json({ message: 'Patient deleted successfully ', deleted })
    } catch (error) {
        res.status(404);
        console.log(error)
        throw new Error("deletion Failed ")
    }
})

export {
    getTries, registerTry, getTriesByID, updateTry, deleteTry, getTryID
}