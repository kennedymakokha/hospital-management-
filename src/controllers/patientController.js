import expressAsyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";
import Patient from '../models/patientModel.js'

const getPatients = expressAsyncHandler(async (req, res) => {
    try {
        const patients = await Patient.find({ deletedAt: null })
        res.status(200).json(patients)
    } catch (error) {
        res.status(404);
        throw new Error("Fetching Failed ")
    }
})
const registerPatient = expressAsyncHandler(async (req, res) => {
    try {
        const { name, phone, email, password, confirm_password,ID_no } = req.body
        const UserExists = await Patient.findOne({ ID_no })
        if (UserExists) {
            throw new Error('Patient Already Exists')
        }
        await Patient.create(req.body)
        res.status(200).json({ message: 'User Created' })
    } catch (error) {
        console.log(error)
    }
})
const getpatientByID = expressAsyncHandler(async (req, res) => {
    const user = await Patient.findById(req.params.id)
    res.status(200).json(user)
})
const updatePatient = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await Patient.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        res.status(200).json({ message: 'Patient Updated successfully ', updates })
    } catch (error) {
        res.status(400).json({ message: 'Patient Updated failed ', updates })
    }
})
const deletePatient = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await Patient.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        res.status(200).json({ message: 'Patient deleted successfully ', deleted })
    } catch (error) {
        res.status(404);
        console.log(error)
        throw new Error("deletion Failed ")
    }
})

export {
    getpatientByID, getPatients, registerPatient, updatePatient, deletePatient,
}