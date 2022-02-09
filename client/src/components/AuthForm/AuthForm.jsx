import React from 'react'
import useForm from '../../hooks/useForm'
import InputText from '../UI/Input/Input'
import {useRequest} from '../../hooks/useRequest'

export default function AuthForm() {
  const {request, loading, requestError} = useRequest()

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    isTouched,
    isSubmitting,
    values,
    requestAction,
    setRequestAction
  } = useForm(() => {
    if (requestAction === 'auth') {
      (async () => {
        try {
          const data = await request('/api/auth/login', 'GET')
        } catch (e) {
        }
      })()
    }
    if (requestAction === 'reg') {
      (async () => {
        try {
          const data = await request('/api/auth/register', 'POST', {...values})
        } catch (e) {
          console.log(e)
        }
      })()
    }
  }, {
    email: ['required', 'email'],
    password: ['password'],
  })

  return (
    <>
      {isSubmitting
        ? <div>Loading...</div>
        :
        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          {requestError && <div>{requestError}</div>}
          <InputText
            key="auth-form__email"
            name="email"
            id="auth-form__email"
            type="text"
            label="E-mail"
            value={values.email || ''}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {(errors.email && errors.email.length > 0 && isTouched.email) && errors.email.map((error, index) =>
            (
              <p key={'email' + index}>{error}</p>
            )
          )}

          <InputText
            key="auth-form__password"
            name="password"
            id="auth-form__password"
            type="text"
            label="password"
            value={values.password || ''}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {(errors.password && errors.password.length > 0 && isTouched.password) && errors.password.map((error, index) => (
            <p key={'test' + index}>{error}</p>))}

          <button type="submit" onClick={() => setRequestAction('auth')}>auth</button>
          <button type="submit" onClick={() => setRequestAction('reg')}>reg</button>
        </form>
      }
    </>
  )
}
