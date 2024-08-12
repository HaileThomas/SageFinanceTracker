import { Request, Response } from 'express'
import { validatePassword, generateToken } from '../utils/userUtil'
import { getUser, createUser as registerUser } from '../services/userService'

const createUser = async (req: Request, res: Response): Promise<void> => {
  const { firstname, lastname, username, password } = req.body

  try {
    const user = await getUser(username)
    if (user) {
      res.status(409).json({ Status: 'Failure', Error: 'User already exists' })
      return
    }

    await registerUser(firstname, lastname, username, password)
    res.status(201).json({ Status: 'Success', Message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ Status: 'Failure', Error: 'Registration Error' })
  }
}

const authenticateUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body

  try {
    const user = await getUser(username)
    if (!user) {
      res.status(404).json({ Status: 'Failure', Error: 'User not found' })
      return
    }

    const isCorrectPassword = await validatePassword(password, user.password)
    if (!isCorrectPassword) {
      res.status(401).json({ Status: 'Failure', Error: 'Incorrect Password' })
      return
    }

    res.cookie('Token', generateToken(username))
    res.json({ Status: 'Success', Message: 'Authentication successful' })
  } catch (err) {
    res.status(500).json({ Status: 'Failure', Error: 'Login Error' })
  }
}

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('Token')
    res.json({ Status: 'Success', Message: 'Logged out successfully' })
  } catch (err) {
    res.status(500).json({ Status: 'Failure', Error: 'Logout Error' })
  }
}

export { createUser, authenticateUser, logoutUser }
