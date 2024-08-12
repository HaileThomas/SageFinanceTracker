import axios from 'axios'

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/transaction`,
  withCredentials: true,
})

const serverRefresh = async (props: { userId: number }) => {
  await instance.post(`/sync`, { ...props })
}

const fetchTransactions = async (props: { userId: number; maxCount: number }) => {
  const { data } = await instance.post(`/list`, { ...props })
  return data
}

const fetchTransactionAmounts = async (props: { userId: number }) => {
  const { data } = await instance.post(`/listAmounts`, { ...props })
  return data
}

export { serverRefresh, fetchTransactions, fetchTransactionAmounts }
