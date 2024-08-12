import axios, { AxiosError } from 'axios'

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/authentication`,
  withCredentials: true,
})

interface SuccessResponse {
  Status: 'Success'
}

interface FailureResponse {
  Status: 'Failure'
  Error: string
}

const handleRegisterApi = async (props: {
  firstname: string
  lastname: string
  username: string
  password: string
}): Promise<SuccessResponse | FailureResponse> => {
  try {
    const { data } = await instance.post('/register', { ...props })
    return data as SuccessResponse
  } catch (err) {
    const response = (err as AxiosError).response?.data as FailureResponse
    return response
  }
}

const handleLoginApi = async (props: {
  username: string
  password: string
}): Promise<SuccessResponse | FailureResponse> => {
  try {
    const { data } = await instance.post('/login', { ...props })
    return data as SuccessResponse
  } catch (err) {
    const response = (err as AxiosError).response?.data as FailureResponse
    return response
  }
}

const handleLogoutApi = async (): Promise<SuccessResponse | FailureResponse> => {
  try {
    const { data } = await instance.post('/logout')
    return data as SuccessResponse
  } catch (err) {
    const response = (err as AxiosError).response?.data as FailureResponse
    return response
  }
}

export { handleLoginApi, handleRegisterApi, handleLogoutApi }
