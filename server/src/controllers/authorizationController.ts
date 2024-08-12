import { Request, Response } from 'express'
import { getUser } from '../services/userService'

const verifyUser = (req: Request, res: Response): void => {
  res.status(200).json({ Status: 'Success', Username: (req as any).name })
}

const getUserID = async (req: Request, res: Response): Promise<void> => {
  try {
    const username: string = (req as any).name as string
    const user = await getUser(username)

    res.json({ Status: 'Success', UserID: user.id })
  } catch (err) {
    res.status(500).json({ Status: 'Error', Error: 'Internal Server Error' })
  }
}

export { verifyUser, getUserID }
