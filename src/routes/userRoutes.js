import express from 'express'
import { authUser, updateUserProfile,getroleUsers, EditUserDetails, registerUser, logoutUser, getUserProfile, getUser } from '../controllers/userController.js'
import { isAuth, protect } from '../middlewere/authMiddleware.js'

const router = express.Router()
router.post('/', protect, registerUser)

router.get('/role-users/:role',protect, getroleUsers)
router.route('/:id').put(protect, EditUserDetails).get(protect, getUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/user/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

export default router 