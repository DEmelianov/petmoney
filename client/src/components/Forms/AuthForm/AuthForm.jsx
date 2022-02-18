import React from 'react'
import useForm from '../../../hooks/useForm'
import InputText from '../../UI/InputText/InputText'
import {isEmail, isRequired, isSame, minLength} from '../../../utils/validator'
import {registerUser} from '../../../api/api'
import Button from '../../UI/Button/Button'
import FormControl from '../../UI/Form/FormControl/FormControl'
import Form from '../../UI/Form/Form/Form'

export default function AuthForm() {

  const validateRules = [
    ({email}) => isRequired(email) || {email: 'E-mail is required'},
    ({email}) => isEmail(email) || {email: 'Enter correct e-mail'},
    ({password}) => isRequired(password) || {password: 'Password is required'},
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
      <FormControl justify="end">
        <Button
          type="primary"
          htmlType="submit"
          wide
          loading={isSubmitting}
          disabled={!!(Object.keys(errors).length)}
        >
          Authorize
        </Button>
      </FormControl>
    </Form>
  )
}
