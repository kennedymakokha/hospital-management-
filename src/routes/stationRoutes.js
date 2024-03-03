import express from 'express'
import { protect } from '../middlewere/authMiddleware.js'
import { getByID, getStations, deleteStation, updateStation, register } from '../controllers/stationController.js'

const router = express.Router()
router.route('/:id')
    .delete(protect, deleteStation)
    .put(protect, updateStation)
    .get(protect, getByID)

router.route('/')
    .post(protect, register)
    .get(protect, getStations)

export default router 