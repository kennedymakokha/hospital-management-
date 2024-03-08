import express from 'express'
import {  protect } from '../middlewere/authMiddleware.js'
import { getpatientByID, getPatients, registerPatient, authPatient, updatePatient, deletePatient } from '../controllers/patientController.js'

const router = express.Router()
router.route('/:id')
    .delete(protect, deletePatient)
    .put(protect, updatePatient)
    .get(protect, getpatientByID)

router.route('/login-patient').post(authPatient)


router.route('/')
    .post(protect, registerPatient)
    .get(protect, getPatients)


    .put(protect, updatePatient)


export default router 