async function request(url, method = 'GET', body = null, headers = {}) {
  try {
    if (body) {
      body = JSON.stringify(body)
      headers['Content-Type'] = 'application/json'
    }

    const response = await fetch(url, {method, body, headers})
    const data = await response.json()

    if (!response.ok) {
      throw data
    }

    return data
  } catch (e) {
    if (e instanceof Error) {
      throw e.message
    }
    throw e
  }
}

export async function registerUser(body) {
  await request('/api/auth/register', 'POST', body)
}