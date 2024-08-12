import { User } from '../models/User'
import bcrypt from 'bcrypt'
import { database as db } from '../config/database'

const getUser = async (username: string): Promise<User> => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE username = ?', [username])
    return (rows as User[])[0]
  } catch (err) {
    throw new Error('Failed to retrieve user from database.')
  }
}

const createUser = async (firstname: string, lastname: string, username: string, password: string): Promise<void> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await db.promise().query('INSERT INTO users (firstname, lastname, username, password) VALUES (?, ?, ?, ?)', [firstname, lastname, username, hashedPassword])
  } catch (err) {
    throw new Error('Failed to create user in database.')
  }
}

export { getUser, createUser }
