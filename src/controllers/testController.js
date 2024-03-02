import expressAsyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";
import Test from '../models/diseaseModel.js'
import Symptoms from '../models/symptomsModel.js'

const getTest = expressAsyncHandler(async (req, res) => {
    try {
        const tests = await Test.find({ deletedAt: null })
        res.status(200).json(tests)
    } catch (error) {
        res.status(404);
        throw new Error("Fetching Failed ")
    }
})
const registerTest = expressAsyncHandler(async (req, res) => {
    try {
        await Test.create(req.body)
        res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})


const updateTest = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await Test.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        res.status(200).json({ message: 'role Updated successfully ', updates })
    } catch (error) {
        res.status(400).json({ message: 'role Updated failed ' })
    }
})
const deleteTest = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await Test.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        res.status(200).json({ message: ' deleted successfully ', deleted })
    } catch (error) {
        res.status(404);
        console.log(error)
        throw new Error("deletion Failed ")
    }
})
const registerSymptoms = expressAsyncHandler(async (req, res) => {
    try {
        await Symptoms.create(req.body)
        res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})
const getSymptoms = expressAsyncHandler(async (req, res) => {
    try {
        let symptoms = await Symptoms.find().populate('test_id', 'name')
            .populate('user_id', 'firstName')

        res.status(200).json(symptoms)
    } catch (error) {
        console.log(error)
    }
})
const getUsertest = expressAsyncHandler(async (req, res) => {
    try {
        let symptoms = await Symptoms.find({ user_id: req.params.id })
            .populate('test_id', 'name')
            .populate('user_id', 'firstName lastName')
        console.log(symptoms)
        res.status(200).json(symptoms)
    } catch (error) {
        console.log(error)
    }
})



export {
    getTest, updateTest, deleteTest, getUsertest, registerTest, registerSymptoms, getSymptoms
}