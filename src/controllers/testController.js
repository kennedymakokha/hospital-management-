import expressAsyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";
import Test from '../models/diseaseModel.js'
import Symptoms from '../models/symptomsModel.js'
import Results from '../models/labresultModel.js'
import Prescription from '../models/prescriptionModel.js'
import PatientDrug from '../models/patientDrugModel.js'
import Sales from '../models/salesModel.js'
import admin from './../../index.js'

const getTest = expressAsyncHandler(async (req, res) => {
    try {
        const tests = await Test.find({ deletedAt: null })

        // let payload = {
        //     notification: {
        //         title: "From Backend",
        //         body: 'teaajc'
        //     },
        //     data: {
        //         url: 'https://www.youtube.com'
        //     },

        //     tokens: ['eGMz1BYxVXXxtmwjj-pHGF:APA91bGEeQYsfsxGy9kCRbAtsJGb__bKDjnFWC-Zv7hcXKXh3MYjdM3yb51aRLxCBTXv1isqc-9hfEaImHKtNbp76bMZ_wPtcXgmK49ZoNuagHKJYUgA3MH6h7SjAMmrvx9yBA6VYvFg']
        //     // token: 'eGMz1BYxVXXxtmwjj-pHGF:APA91bGEeQYsfsxGy9kCRbAtsJGb__bKDjnFWC-Zv7hcXKXh3MYjdM3yb51aRLxCBTXv1isqc-9hfEaImHKtNbp76bMZ_wPtcXgmK49ZoNuagHKJYUgA3MH6h7SjAMmrvx9yBA6VYvFg'
        // }
        // admin.messaging().sendEachForMulticast(payload)
        return res.status(200).json(tests)
    } catch (error) {
        return res.status(404);
        throw new Error("Fetching Failed ")
    }
})
const registerTest = expressAsyncHandler(async (req, res) => {
    try {
        await Test.create(req.body)
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})


const updateTest = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await Test.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'role Updated successfully ', updates })
    } catch (error) {
        return res.status(400).json({ message: 'role Updated failed ' })
    }
})
const deleteTest = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await Test.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: ' deleted successfully ', deleted })
    } catch (error) {
        return res.status(400).json("Deletion Failed");

    }
})
const registerSymptoms = expressAsyncHandler(async (req, res) => {
    try {
        req.body.test_id = req?.body?.tests
        req.body.createdBy = req.user._id
        await Symptoms.create(req.body)
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})
const postPresscriptions = expressAsyncHandler(async (req, res) => {
    try {
        req.body.createdBy = req.user._id
        let presciption = await Prescription.create(req.body)
        await Results.findOneAndUpdate({ _id: req.body.labTest_id }, { prescription_id: presciption._id }, { new: true, useFindAndModify: false })
        for (let index = 0; index < req.body.drugs.length; index++) {
            let body = {
                drug_id: req.body.drugs[index].drug_id,
                patient_id: req.body.patient_id,
                LabTest_id: req.body.labTest_id,
                dosage: req.body.drugs[index].dosage,
                createdBy: req.user._id
            }
            await PatientDrug.create(body)
        }
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})
const postSales = expressAsyncHandler(async (req, res) => {
    try {
        
        for (let index = 0; index < req.body.length; index++) {
            let body = {
                drug_id: req.body[index].drug_id._id,
                patient_id: req.body[index].patient_id,
                LabTest_id: req.body[index].labTest_id,
                price: req.body[index].price,
                createdBy: req.user._id
            }
            await Sales.create(body)
            await PatientDrug.findOneAndUpdate({ LabTest_id: req.body[index].LabTest_id }, { dispenced: true }, { new: true, useFindAndModify: false })
        }
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})
const registerResults = expressAsyncHandler(async (req, res) => {
    try {
        req.body.createdBy = req.user._id
        await Results.create(req.body)
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})
const getpatientsPrescription = expressAsyncHandler(async (req, res) => {
    try {
        let results = await PatientDrug.find({ patient_id: req.params.id, dispenced: false }).populate({
            path: 'drug_id', select: "name"
        })
        console.log(results)
        return res.status(200).json(results)
    } catch (error) {
        console.log(error)
    }
})
const getUserResults = expressAsyncHandler(async (req, res) => {
    try {
        let results = await Results.find({ patient_id: req.params.id }).populate({
            path: 'results',
            populate: {
                path: 'test_id',
                select: "name "
            }

        }).populate({ path: 'observation_id', select: "symptoms" })
            .populate({
                path: 'prescription_id',


            })
        return res.status(200).json(results)
    } catch (error) {
        console.log(error)
    }
})
const getResults = expressAsyncHandler(async (req, res) => {
    try {
        let results = await Results.find().populate({ path: 'observation_id', select: "symptoms" })
            .populate({
                path: 'patient_id', select: "gender",
                populate: {
                    path: 'user_id',
                    select: "name phone "
                }

            })
            .populate({
                path: 'results',
                populate: {
                    path: 'test_id',
                    select: "name "
                }
            })

        return res.status(200).json(results)
    } catch (error) {
        console.log(error)
    }
})
const getSymptoms = expressAsyncHandler(async (req, res) => {
    try {

        let symptoms = await Symptoms.find()
            .populate({
                path: 'patient_id',
                populate: {
                    path: 'user_id',
                    select: "name phone "
                }
            })
            .populate('test_id', 'name')
        // .populate('user_id', 'firstName')

        return res.status(200).json(symptoms)
    } catch (error) {
        console.log(error)
    }
})
const getUsertest = expressAsyncHandler(async (req, res) => {
    try {
        let symptoms = await Symptoms.find({ patient_id: req.params.id })
            .populate('test_id', 'name')
            .populate({
                path: 'patient_id',
                populate: {
                    path: 'user_id',
                    select: "name phone "
                }
            })

        return res.status(200).json(symptoms)
    } catch (error) {
        console.log(error)
    }
})



export {
    getTest, updateTest, postSales, deleteTest, getpatientsPrescription, postPresscriptions, getUserResults, getUsertest, getResults, registerTest, registerResults, registerSymptoms, getSymptoms
}