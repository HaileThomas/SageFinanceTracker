import { Router } from 'express'
import { getAccountBalances } from '../controllers/bankController'

const router = Router()

router.post('/list', getAccountBalances)

export default router
