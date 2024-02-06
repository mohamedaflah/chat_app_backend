import express from 'express'
import { checkAuthController, loginController, logoutController, signupController } from '../controllers/userController'
const router=express.Router()
router.post('/signup',signupController)
router.post('/login',loginController)
router.get('/checkAuth',checkAuthController)
router.get('/logout',logoutController)
export default router