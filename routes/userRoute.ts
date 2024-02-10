import express from 'express'
import { checkAuthController, getAllUsers, loginController, logoutController, signupController } from '../controllers/userController'
const router=express.Router()
router.post('/signup',signupController)
router.post('/login',loginController)
router.get('/checkAuth',checkAuthController)
router.get('/logout',logoutController)
router.get('/get-allUsers',getAllUsers)
export default router