import express from 'express'
import { authUser, updateUserProfile, getUser, EditUserDetails, registerUser, logoutUser, getUserProfile, getUsers } from '../controllers/userController.js'
import { protect } from '../middlewere/authMiddleware.js'

const router = express.Router()
router.post('/', protect, registerUser)
router.get('/', getUsers)
router.route('/:id').put(protect, EditUserDetails).get(protect, getUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router 