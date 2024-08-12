import { Router } from 'express'
import { syncTransactions, listTransactions, listExpenses } from '../controllers/transactionController'

const router = Router()

router.post('/sync', syncTransactions)
router.post('/list', listTransactions)
router.post('/listAmounts', listExpenses)

export default router
