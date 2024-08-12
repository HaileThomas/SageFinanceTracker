import axios, { AxiosError } from 'axios'

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/authorization`,
  withCredentials: true,
})

interface VerifiedResponse {
  Status: 'Success'
  Username: string
}

interface UserIDResponse {
  Status: 'Success'
  UserID: number
}

interface FalseResponse {
  Status: 'Failure'
  Error: string
}

const checkUserAuthentication = async (): Promise<VerifiedResponse | FalseResponse> => {
  try {
    const { data } = await instance.get(`/`)
    return data as VerifiedResponse
  } catch (err) {
    const response = (err as AxiosError).response?.data as FalseResponse
    return response
  }
}

const getUserID = async (): Promise<UserIDResponse | FalseResponse> => {
  try {
    const { data } = await instance.get('/id')
    return data as UserIDResponse
  } catch (err) {
    const response = (err as AxiosError).response?.data as FalseResponse
    return response
  }
}

export { checkUserAuthentication, getUserID }
