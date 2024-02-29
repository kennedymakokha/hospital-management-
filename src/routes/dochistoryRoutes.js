import express from 'express'
import { protect } from '../middlewere/authMiddleware.js'
import { createHistory, deleteHistory, getHistory, updateHistory } from '../controllers/dochistoryController.js'

const router = express.Router()
router.route('/:id')
    .delete(protect, deleteHistory)
    .put(protect, updateHistory)
router.route('/')
    .post(protect, createHistory)
    .get(protect, getHistory)
    .put(protect, updateHistory)


export default router 

