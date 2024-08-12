import axios from 'axios'

interface BankBalance {
  name: string
  mask: string | null
  balance: number | null
  type: string | null
}

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/bank`,
  withCredentials: true,
})

const fetchAccountsInfo = async (props: { userId: number }): Promise<BankBalance[]> => {
  const { data } = await instance.post(`/list`, { ...props })
  return data.AccountBalances as BankBalance[]
}

export { fetchAccountsInfo }
