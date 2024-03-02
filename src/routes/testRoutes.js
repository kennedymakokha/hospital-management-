import express from 'express'
import { getTest, updateTest, deleteTest,getUsertest, getSymptoms, registerTest, registerSymptoms } from '../controllers/testController.js'
import { protect } from '../middlewere/authMiddleware.js'

const router = express.Router()

router.route('/symptoms').post(protect, registerSymptoms).get(protect, getSymptoms)
router.route('/')
    .get(protect, getTest)
    .post(protect, registerTest)
router.route('/:id')
    .delete(protect, deleteTest)
    .get(protect, getUsertest)
    .post(protect, updateTest)

export default router 