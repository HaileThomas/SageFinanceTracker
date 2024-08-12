import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const { MYSQL_USER, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env

export const database = mysql.createConnection({
  user: MYSQL_USER,
  host: MYSQL_HOST,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
})

database.connect((err) => {
  if (err) {
    process.exit()
  }
})
