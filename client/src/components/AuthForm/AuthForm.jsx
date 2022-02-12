import React, {useEffect} from 'react'
import useForm from '../../hooks/useForm'
import InputText from '../UI/Input/Input'
import {isEmail, isRequired} from '../../utils/validator'
import {registerUser} from '../../api/api'

export default function AuthForm() {

  const validateRules = [
    ({email}) => isRequired(email) || {email: 'E-mail is required'},
    ({email}) => isEmail(email) || {email: 'Enter correct e-mail'},
    ({password}) => isRequired(password) || {password: 'Password is required'},
    // ({password, repeatPassword}) => isSame(password, repeatPassword) || {repeatPassword: 'Passwords do not match'},
  ]

  const inputInitialValues = {
    email: '',
    password: ''
  }

  const registrationHandler = async () => {
    await registerUser(values)
  }

  const {
    values,
    touched,
    errors,
    isSubmitting,
    formError,
    submitHandler,
    blurHandler,
    changeHandler
  } = useForm(inputInitialValues, validateRules, registrationHandler)

  return (
    <>
      {isSubmitting
        ? <div>loading...</div>
        : <form
          className="auth-form"
          onSubmit={submitHandler}
        >
          {formError && <div>{formError}</div>}
          <InputText
            type="text"
            name="email"
            value={values.email}
            id="auth-form__email"
            inputClassName="auth-form__input auth-form__input_email"
            labelClassName="auth-form__label auth-form__label_email"
            label="E-mail"
            placeholder="E-mail"
            error={errors.email}
            onChange={changeHandler}
            onBlur={blurHandler}
          />

          <InputText
            type="password"
            name="password"
            value={values.password}
            id="auth-form__password"
            inputClassName="auth-form__input auth-form__input_password"
            labelClassName="auth-form__label auth-form__label_password"
            label="Password"
            placeholder="Password"
            error={errors.password}
            onChange={changeHandler}
            onBlur={blurHandler}
          />
          {errors.password && touched.password && <p key="password">{errors.password}</p>}

          <button type="submit">register</button>
        </form>}
    </>
  )
}
