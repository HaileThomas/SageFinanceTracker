import axios, { AxiosError } from 'axios'

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/token`,
  withCredentials: true,
})

interface TokenInfo {
  PlaidToken: {
    expiration: string
    link_token: string
    request_id: string
  }
}

interface LinkTokenResponse {
  PlaidLinkToken: string
}

const createLinkToken = async (props: { userID: number }): Promise<LinkTokenResponse | AxiosError> => {
  try {
    const { data } = await instance.post<TokenInfo>(`/createLinkToken`, { ...props })
    return { PlaidLinkToken: data.PlaidToken.link_token } as LinkTokenResponse
  } catch (err) {
    const response = err as AxiosError
    return response
  }
}

const connectBank = async (props: { publicToken: string; userId: number; institutionId: string }): Promise<void> => {
  await instance.post(`/connectBank`, { ...props })
}

export { createLinkToken, connectBank }
