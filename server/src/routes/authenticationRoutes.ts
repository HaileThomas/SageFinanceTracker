import { Router } from 'express'
import { createUser, authenticateUser, logoutUser } from '../controllers/authenticationController'

const router = Router()

router.post('/register', createUser)
router.post('/login', authenticateUser)
router.post('/logout', logoutUser)

export default router
