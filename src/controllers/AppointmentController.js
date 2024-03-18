import expressAsyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js";
import Role from '../models/roleModel.js'
import User from '../models/userModel.js'
import Appontments from '../models/appointmentModel.js'
import admin from './../../index.js'
const getAppointments = expressAsyncHandler(async (req, res) => {
    try {
        const appointments = await Appontments.find({}).populate("patient_id", "name phone")
            .populate("doc_id", "name phone")
        return res.status(200).json(appointments)
    } catch (error) {
        return res.status(404);
        throw new Error("Fetching Failed ")
    }
})
const BookAppointent = expressAsyncHandler(async (req, res) => {
    try {

        await Appontments.create(req.body)
        let doctor = await User.findById(req.body.doc_id)
            .select("tokens")
        let Patient = await User.findById(req.body.patient_id)
            .select("name")
        let payload = {
            notification: {
                title: "Appointment Reservations",
                body: `${Patient.name} is requesting for an appointment on ${req.body.appointment_date} at ${req.body.appointment_time}\nKindly accept this request\n\bRegards ${Patient.name} `
            },
            data: {
                url: 'https://www.youtube.com'
            },

            tokens: doctor.tokens
        }
        admin.messaging().sendEachForMulticast(payload)

        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})
const getPatientAppointments = expressAsyncHandler(async (req, res) => {
    const appointments = await Appontments.find({ patient_id: req.params.id }).populate("doc_id", "name phone")
    return res.status(200).json(appointments)
})
const getDoctorAppointments = expressAsyncHandler(async (req, res) => {

    const appointments = await Appontments.find({ doc_id: req.params.id }).populate("patient_id", "name phone")
    return res.status(200).json(appointments)
})

const approveAppointMent = expressAsyncHandler(async (req, res) => {
    try {
        let doctor = await User.findById(req.body.doc_id)
            .select("tokens")
        if (req.params.approve === "dis") {
            let updates = await Appontments.findOneAndUpdate({ _id: req.params.id }, { approved: false, reason_not_approved: req.body.reason }, { new: true, useFindAndModify: false })
            let patient = await User.findById(req.body.patient_id)
                .select("tokens")
            // let payload = {
            //     notification: {
            //         title: "Reservations revoked !!! ",
            //         body: `${doctor.name} has  turned down your appointment!!! dated 
            //          ${req.body.appointment_date} at ${req.body.appointment_time}\nReasons: ${req.body.reason} `
            //     },
            //     data: {
            //         url: 'https://www.youtube.com'
            //     },

            //     tokens: patient.tokens
            // }
            console.log(patient.tokens)
            // admin.messaging().sendEachForMulticast(payload)
            return res.status(200).json({ message: ' Updated successfully ', updates })
        } else {
            let updates = await Appontments.findOneAndUpdate({ _id: req.params.id }, { approved: true }, { new: true, useFindAndModify: false })
            let patient = await User.findById(req.body.patient_id)
                .select("tokens")
            let payload = {
                notification: {
                    title: "Reservations Approved  !!! ",
                    body: `${doctor.name} has approved dated ${req.body.appointment_date} at ${req.body.appointment_time}\nReasons: ${req.body.reason} `
                },
                data: {
                    url: 'https://www.youtube.com'
                },

                tokens: patient.tokens
            }
            console.log(patient.tokens)
            // let v = admin.messaging().sendEachForMulticast(payload)
            // console.log(v)
            return res.status(200).json({ message: ' Updated successfully ', updates })
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: ' Updated failed ' })
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
    getPatientAppointments, approveAppointMent, getAppointments, getDoctorAppointments, deleteRole, BookAppointent
}