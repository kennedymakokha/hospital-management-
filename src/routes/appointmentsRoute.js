

import express from 'express'
import { protect } from '../middlewere/authMiddleware.js'
import { getPatientAppointments, approveAppointMent, getDoctorAppointments, BookAppointent, getAppointments } from '../controllers/AppointmentController.js'

const router = express.Router()

router.route('/')
    .post(protect, BookAppointent)
    .get(protect, getAppointments)
router.route('/:id').get(protect, getDoctorAppointments)
router.route('/patient/:id').get(protect, getPatientAppointments)
router.route('/request-action/:id/:approve').put(protect, approveAppointMent)

export default router 