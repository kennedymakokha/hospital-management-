import express from 'express'
import { protect } from '../middlewere/authMiddleware.js'
import { getTries,getTriesByID, registerTry, updateTry, deleteTry, getLastTry } from '../controllers/triageController.js'

const router = express.Router()
router.route('/:id')
    .delete(protect, deleteTry)
    .put(protect, updateTry)
    .get(protect, getLastTry)
    
    router.route('/all/:id').get(protect, getTriesByID)
router.route('/')
    .post(protect, registerTry)
    .get(protect, getTries)

export default router 