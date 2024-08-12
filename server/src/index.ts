import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import authenticationRoutes from './routes/authenticationRoutes'
import authorizationRoutes from './routes/authorizationRoutes'
import tokenRoutes from './routes/tokenRoutes'
import bankRoutes from './routes/bankRoutes'
import transactionRoutes from './routes/transactionRoutes'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript!')
})

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['POST', 'GET'],
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())

app.use('/api/authentication', authenticationRoutes)
app.use('/api/authorization', authorizationRoutes)
app.use('/api/token', tokenRoutes)
app.use('/api/bank', bankRoutes)
app.use('/api/transaction', transactionRoutes)

app.listen(port)
