import { Router } from 'express'
import { verifyUser, getUserID } from '../controllers/authorizationController'
import { verifyUserMiddleware } from '../middleware/authorizationMiddleware'

const router = Router()

router.get('/', verifyUserMiddleware, verifyUser)
router.get('/id', verifyUserMiddleware, getUserID)

export default router
