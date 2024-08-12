import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env

export const verifyUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.Token

  if (!token) {
    return res.status(401).json({ Status: 'Failure', Error: 'You are not authenticated' })
  }

  jwt.verify(token, JWT_SECRET as string, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ Status: 'Failure', Error: 'Token Is Incorrect' })
    } else {
      ;(req as any).name = decoded.username
      next()
    }
  })
}
