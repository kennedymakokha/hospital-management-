

import express from 'express'
import { protect } from '../middlewere/authMiddleware.js'
import { getRole, getRoles, updateRole, deleteRole, registerRole } from '../controllers/roleController.js'

const router = express.Router()
router.route('/:id')
    .delete(protect, deleteRole)
    .put(protect, updateRole)
    .get(protect, getRole)

router.route('/')
    .post(protect, registerRole)
    .get(protect, getRoles)

export default router 