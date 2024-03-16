import express from 'express'
import { getTest, updateTest, deleteTest,postSales, postPresscriptions,getpatientsPrescription, getUserResults, getUsertest, getResults, getSymptoms, registerResults, registerTest, registerSymptoms } from '../controllers/testController.js'
import { protect } from '../middlewere/authMiddleware.js'

const router = express.Router()

router.route('/symptoms').post(protect, registerSymptoms).get(protect, getSymptoms)
router.route('/symptoms/:id').get(protect, getUsertest)
router.route('/results/:id').get(protect, getUserResults)
router.route('/prescription/post-prescription').post(protect, postPresscriptions)
router.route('/payment').post(protect, postSales)
router.route('/prescription/post-prescription/:id').get(protect, getpatientsPrescription)
router.route('/results').post(protect, registerResults).get(protect, getResults)
router.route('/')
    .get(protect, getTest)
    .post(protect, registerTest)
router.route('/:id')
    .delete(protect, deleteTest)
    .get(protect, getUsertest)
    .post(protect, updateTest)

export default router 