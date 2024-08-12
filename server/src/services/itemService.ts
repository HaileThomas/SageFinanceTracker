import { CountryCode } from 'plaid'
import { database as db } from '../config/database'
import { plaidClient } from '../config/plaid'

interface ItemDBS {
  id: string
  user_id: number
  access_token: string
  transaction_cursor: string
  institution_id: string
  is_active: boolean
}

const addItem = async (userId: number, itemId: string, accessToken: string, institutionId: string): Promise<void> => {
  try {
    await db.promise().query(`INSERT INTO items (id, user_id, institution_id, access_token) VALUES (?, ?, ?, ?)`, [itemId, userId, institutionId, accessToken])
  } catch (err) {
    throw new Error('Failed to add item to database.')
  }
}

const getItemsForUser = async (userId: number): Promise<ItemDBS[]> => {
  try {
    const [accounts] = await db.promise().query('SELECT *  FROM items WHERE user_id = ? AND is_active = ?', [userId, 1])
    return accounts as ItemDBS[]
  } catch (err) {
    throw new Error("Failed to get user's items from database.")
  }
}

const getItemForBank = async (institutionId: string, userId: number): Promise<ItemDBS> => {
  try {
    const [rows] = await db
      .promise()
      .query('SELECT * FROM items WHERE institution_id = ? AND user_id = ? AND access_token != "REVOKED" AND is_active != 0', [institutionId, userId])

    return (rows as ItemDBS[])[0]
  } catch (err) {
    throw new Error("Failed to get bank's item from database.")
  }
}

const getItem = async (itemId: string): Promise<ItemDBS> => {
  try {
    const [rows] = await db.promise().query(`SELECT * FROM items WHERE id = ?`, [itemId])
    return (rows as ItemDBS[])[0]
  } catch (err) {
    throw new Error("Failed to get user's item from database.")
  }
}

const getItemName = async (institutionId: string): Promise<string> => {
  const { data } = await plaidClient.institutionsGetById({
    institution_id: institutionId,
    country_codes: [CountryCode.Us],
  })

  return data.institution.name
}

const removeItem = async (itemId: string): Promise<void> => {
  try {
    await db.promise().query('DELETE FROM items WHERE id = ?', [itemId])
  } catch (err) {
    throw new Error('Failed to remove item from database')
  }
}

const deactivateItem = async (itemId: string): Promise<void> => {
  try {
    const [accounts] = await db.promise().query('SELECT id FROM accounts WHERE item_id = ?', [itemId])
    const accountIds = (accounts as { id: number }[]).map((account) => account.id)

    if (accountIds.length > 0) {
      await db.promise().query('DELETE FROM transactions WHERE account_id IN (?)', [accountIds])
    }

    await db.promise().query('DELETE FROM accounts WHERE item_id = ?', [itemId])
    await removeItem(itemId)
  } catch (err) {
    throw new Error('Failed to deactivate item from database')
  }
}

export { addItem, getItemsForUser, getItemForBank, getItem, getItemName, deactivateItem }
