import express from 'express'
import { protect } from '../middlewere/authMiddleware.js'
import { getTries,getTriesByID, registerTry, updateTry, deleteTry, getTryID } from '../controllers/triageController.js'

const router = express.Router()
router.route('/:id')
    .delete(protect, deleteTry)
    .put(protect, updateTry)
    .get(protect, getTryID)
    .get(protect, getTriesByID)
    router.route('/all/:id').get(protect, getTriesByID)
router.route('/')
    .post(protect, registerTry)
    .get(protect, getTries)

export default router 