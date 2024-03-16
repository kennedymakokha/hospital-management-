import expressAsyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";
import Medications from '../models/medicationsModel.js'

const getMedications = expressAsyncHandler(async (req, res) => {
    try {
        const meds = await Medications.find({ deletedAt: null })
        return res.status(200).json(meds)
    } catch (error) {
        return res.status(404).json("Error drawing medications");
    }
})
const Postmedications = expressAsyncHandler(async (req, res) => {
    try {
        req.body.createdBy = req.user._id,
            await Medications.create(req.body)
        return res.status(200).json({ message: 'Medication Posted Successfully ' })
    } catch (error) {
        return res.status(404).json(error);
    }
})


const updateMedications = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await Medications.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Medication Updated successfully ', updates })
    } catch (error) {
        return res.status(400).json({ message: 'Medication Updated failed ', updates })
    }
})
const deleteMedication = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await Medications.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Medication deleted successfully ', deleted })
    } catch (error) {
        return res.status(404).json("Deletions Failed ");

    }
})

export {
    getMedications, Postmedications, updateMedications, deleteMedication, 
}