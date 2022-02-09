import {useState} from 'react'

export const useRequest = () => {
  const [loading, setLoading] = useState(false)
  const [requestError, setRequestError] = useState(null)

  const request = async (url, method = 'GET', body = null, headers = {}) => {
    setRequestError(null)
    setLoading(true)

    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(url, {method, body, headers})
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something wrong')
      }

      setLoading(false)

      return data
    } catch (e) {
      setLoading(false)
      setRequestError(e.message)
      throw e
    }
  }

  return {loading, request, requestError}
}