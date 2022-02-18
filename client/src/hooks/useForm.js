import {useState} from 'react'
import {validate} from '../utils/validator'

export default function useForm(inputInitialValues = {}, validateRules = [], onSubmitHandler) {
  const initialErrors = validate(validateRules, inputInitialValues)
  const [values, setValues] = useState(inputInitialValues)
  const [errors, setErrors] = useState(initialErrors)
  const [formError, setFormError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const changeHandler = event => {
    const newValues = {...values, [event.target.name]: event.target.value}
    setValues(newValues)

    const newErrors = validate(validateRules, newValues)
    setErrors(newErrors)
  }

  const submitHandler = async event => {
    event.preventDefault()

    if (!Object.keys(errors).length) {
      setIsSubmitting(true)
      setFormError(null)
      try {
        await onSubmitHandler(values)
      } catch (e) {
        // TODO: replace to logic setServerErrors
        if (e.errors && e.errors.length > 0) {
          const newErrors = e.errors.map(error => {
            if (Object.keys(inputInitialValues).includes(error.param)) {
              return {[error.param]: error.msg}
            }
            return false
          }).reduce((newErrors, error) => ({...newErrors, ...error}), {})

          setErrors(errors => ({...errors, ...newErrors}))
        }

        if (e.message) {
          setFormError(e.message)
        }
      }
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    formError,
    isSubmitting,
    changeHandler,
    submitHandler,
  }
}
