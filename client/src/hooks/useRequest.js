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
        setRequestError(() => ({...data}))
        throw {...data}
      }

      setLoading(false)
      return data
    } catch (e) {
      setLoading(false)
      console.log('e in request', e)
      throw e
    }
  }

  return {loading, request, requestError}
}