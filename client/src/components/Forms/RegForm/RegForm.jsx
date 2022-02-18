import React from 'react'
import useForm from '../../../hooks/useForm'
import InputText from '../../UI/InputText/InputText'
import {isEmail, isRequired, isSame, minLength} from '../../../utils/validator'
import {registerUser} from '../../../api/api'
import Button from '../../UI/Button/Button'
import FormControl from '../../UI/Form/FormControl/FormControl'
import Form from '../../UI/Form/Form/Form'

export default function RegForm() {

  const validateRules = [
    ({email}) => isRequired(email) || {email: 'E-mail is required'},
    ({email}) => isEmail(email) || {email: 'Enter correct e-mail'},
    ({password}) => isRequired(password) || {password: 'Password is required'},
    ({password}) => minLength(6, password) || {password: 'Password should contains at least 6 characters'},
    ({password, confirmPassword}) => isSame(password, confirmPassword) || {confirmPassword: 'Passwords do not match'},
  ]

  const inputInitialValues = {
    email: '',
    password: '',
    confirmPassword: ''
  }

  const registrationHandler = async () => {
    await registerUser(values)
  }

  const {
    values,
    errors,
    isSubmitting,
    formError,
    submitHandler,
    changeHandler
  } = useForm(inputInitialValues, validateRules, registrationHandler)

  return (
    <Form
      error={formError}
      loading={isSubmitting}
      onSubmit={submitHandler}
    >
      <FormControl>
        <InputText
          type="text"
          name="email"
          value={values.email}
          id="auth-form__email"
          label="E-mail"
          error={errors.email}
          onChange={changeHandler}
        />
      </FormControl>
      <FormControl>
        <InputText
          type="password"
          name="password"
          value={values.password}
          id="auth-form__password"
          label="Password"
          error={errors.password}
          onChange={changeHandler}
        />
      </FormControl>
      <FormControl>
        <InputText
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          id="auth-form__confirmPassword"
          label="Confirm password"
          error={errors.confirmPassword}
          onChange={changeHandler}
        />
      </FormControl>
      <FormControl justify="end">
        <Button
          type="primary"
          htmlType="submit"
          wide
          loading={isSubmitting}
          disabled={!!(Object.keys(errors).length)}
        >
          Register
        </Button>
      </FormControl>
    </Form>
  )
}
