import expressAsyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";
import Test from '../models/diseaseModel.js'
import Symptoms from '../models/symptomsModel.js'
import Results from '../models/labresultModel.js'
import Prescription from '../models/prescriptionModel.js'
import PatientDrug from '../models/patientDrugModel.js'
import Sales from '../models/salesModel.js'
import admin from '../../index.js'


const postSales = expressAsyncHandler(async (req, res) => {
    try { 
        req.body.forEach(async element => {
            let body = {
                drug_id: element.drug_id._id,
                patient_id: element.patient_id,
                LabTest_id: element.labTest_id,
                price: element.price,
                createdBy: req.user._id
            }
            await Sales.create(body)
            // console.log(element.LabTest_id)
            let v = await PatientDrug.findOneAndUpdate({ prescription_id: element.prescription_id }, { dispenced: true }, { new: true, useFindAndModify: false })
            console.log("Updated", v)
        });
     
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

const getpatientssales = expressAsyncHandler(async (req, res) => {
    try {
        let results = await Sales.find({ patient_id: req.params.id }).populate({
            path: 'drug_id', select: "name"
        })
        console.log(results)
        return res.status(200).json(results)
    } catch (error) {
        console.log(error)
    }
})
const getsales = expressAsyncHandler(async (req, res) => {
    try {
        let results = await Sales.find().populate({
            path: 'drug_id', select: "name"
        })
        console.log(results)
        return res.status(200).json(results)
    } catch (error) {
        console.log(error)
    }
})





export {
     postSales,getpatientssales,getsales}