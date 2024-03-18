import express from 'express'
import { getpatientssales,getsales  ,postSales } from '../controllers/salesController.js'
import { protect } from '../middlewere/authMiddleware.js'

const router = express.Router()


router.route('/')
    .get(protect, getsales)
    .post(protect, postSales)
router.route('/:id')
    // .delete(protect, deleteTest)
    .get(protect, getpatientssales)
    // .post(protect, postSales)

export default router 