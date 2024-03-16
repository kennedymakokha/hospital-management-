

import express from 'express'
import { protect } from '../middlewere/authMiddleware.js'
import { getMedications, Postmedications, updateMedications, deleteMedication, } from '../controllers/medicationsController.js'
const router = express.Router()
router.route('/:id')
    .delete(protect, deleteMedication)
    .put(protect, updateMedications)
router.route('/')
    .post(protect, Postmedications)
    .get(protect, getMedications)

export default router 