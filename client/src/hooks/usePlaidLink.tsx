import { useEffect, useState } from 'react'
import { usePlaidLink as PlaidLink } from 'react-plaid-link'
import { createLinkToken, connectBank } from '../api/plaidToken'
import { useAuth } from '../context/AuthenticationContext'

export const usePlaidLink = (onComplete: () => void) => {
  const [linkToken, setLinkToken] = useState<string | null>(null)
  const { userID } = useAuth()

  const initializePlaid = async () => {
    if (userID) {
      try {
        const tokenResponse = await createLinkToken({ userID: userID })
        if (tokenResponse && 'PlaidLinkToken' in tokenResponse) {
          setLinkToken(tokenResponse.PlaidLinkToken as string)
        }
      } catch (err) {
        throw new Error('Error fetching Plaid token')
      }
    }
  }

  useEffect(() => {
    initializePlaid()
  }, [])

  const onSuccess = async (public_token: string, metadata: any): Promise<void> => {
    if (userID) {
      await connectBank({
        publicToken: public_token,
        userId: userID,
        institutionId: metadata.institution.institution_id,
      })
    }

    onComplete()
  }

  const { open, ready } = PlaidLink({
    token: linkToken || null,
    onSuccess: onSuccess,
  })

  return { open, ready }
}
