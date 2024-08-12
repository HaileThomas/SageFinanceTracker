import { Router } from 'express'
import { createLinkToken, connectBank } from '../controllers/tokenController'
import { exchangePublicToken } from '../middleware/tokenMiddleware'

const router = Router()

router.post('/createLinkToken', createLinkToken)
router.post('/connectBank', exchangePublicToken, connectBank)

export default router
