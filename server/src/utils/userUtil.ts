import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

const validatePassword = async (inputPassword: string, storedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(inputPassword, storedPassword)
}

const generateToken = (username: string): string => {
  return jwt.sign({ username }, process.env.JWT_SECRET as string, { expiresIn: '1d' })
}

export { validatePassword, generateToken }
