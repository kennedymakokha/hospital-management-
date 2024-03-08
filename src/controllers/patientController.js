import expressAsyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";
import Patient from '../models/patientModel.js'
import Visit from '../models/visitModel.js'
import Doctor from '../models/userModel.js'
import User from '../models/userModel.js'
import Role from '../models/roleModel.js'

const getPatients = expressAsyncHandler(async (req, res) => {
    try {
        const patients = await Patient.find({ deletedAt: null }).populate('user_id', "name email phone")

        return res.status(200).json(patients)
    } catch (error) {
        res.status(404);
        throw new Error("Fetching Failed ")
    }
})
const registerPatient = expressAsyncHandler(async (req, res) => {
    try {
        const { name, phone, email, password, doc, confirm_password, ID_no } = req.body
        const UserExists = await Patient.findOne({ ID_no })
        req.body.password = req.body.ID_no
        let DoD
        if (doc) {
            DoD = await Doctor.findOne({ onduty: true, _id: doc })
        } else {
            DoD = await Doctor.findOne({ onduty: true })
        }
        if (UserExists) {
            throw new Error('Patient Already Exists')
        }
        let role = await Role.findOne({ name: 'Patient' })
        req.body.role = role._id
        req.body.name = `${req.body?.firstName} ${req.body?.lastName}`
        const newUser = await User.create(req.body)
        req.body.user_id = newUser._id
        const newPatient = await Patient.create(req.body)
        await Visit.create({
            doctor_id: DoD._id, user_id: newPatient._id
        })
        return res.status(200).json({ message: 'User Created' })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'User Created' })
    }
})
// router.get("/door-step/track/packages", [authMiddleware, authorized], async (req, res) => {
//     try {
//         let packages
//         if (req.query.searchKey) {
//             var searchKey = new RegExp(`${req.query.searchKey}`, 'i')
//             packages = await Track_door_step.find({ $or: [{ reciept: searchKey }] }).sort({ createdAt: -1 }).limit(100)
//                 .populate('package')
//             // .populate("collectedby")
//             // .populate("droppedTo")
//             return res.status(200)
//                 .json(packages);
//         } else {
//             packages = await Track_door_step.find().sort({ createdAt: -1 }).limit(100)
//                 .populate({
//                     path: 'package',
//                     populate: {
//                         path: 'agent',
//                     }
//                 })
//                 // .populate("collectedby")
//                 .populate({
//                     path: 'package',
//                     populate: {
//                         path: 'businessId',
//                     },

//                     populate: {
//                         path: 'assignedTo'
//                     },
//                 })
//             return res.status(200)
//                 .json(packages);
//         }
//     } catch (error) {
//         console.log(error);
//         return res
//             .status(400)
//             .json({ success: false, message: "operation failed ", error });
//     }
// });
const authPatient = expressAsyncHandler(async (req, res) => {
    try {
        const { ID_no, password } = req.body;

        const user = await Patient.findOne({ ID_no })

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id)
            let newTokens = user.tokens.push(req.body.token)
            await Patient.findOneAndUpdate({ ID_no }, { tokens: newTokens }, { new: true, useFindAndModify: false })
            return res.status(201).json({
                id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                ID_no: user.ID_no,
                tokens: user.tokens
            })
        } else {
            return res.status(401).json({ message: "" })

        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message })
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
    getpatientByID, authPatient, getPatients, registerPatient, updatePatient, deletePatient,
}