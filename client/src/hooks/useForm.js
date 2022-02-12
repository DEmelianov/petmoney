import {useState} from 'react'
import {validate} from '../utils/validator'

export default function useForm(inputInitialValues = {}, validateRules = [], onSubmitHandler) {
  const initialErrors = validate(validateRules, inputInitialValues)
  const [values, setValues] = useState(inputInitialValues)
  const [errors, setErrors] = useState(initialErrors)
  const [formError, setFormError] = useState(null)
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  console.log('useForm')

  const changeHandler = event => {
    const newValues = {...values, [event.target.name]: event.target.value}
    setValues(newValues)

    const newErrors = validate(validateRules, newValues)
    setErrors(newErrors)
  }

  const blurHandler = event => {
    setTouched(touched => {
      if (!touched[event.target.name] || touched[event.target.name] !== true) {
        const newErrors = validate(validateRules, values)
        setErrors(newErrors)

        return {...touched, [event.target.name]: true}
      }
      return touched
    })
  }

  const submitHandler = async event => {
    event.preventDefault()

    if (!Object.keys(errors).length) {
      setIsSubmitting(true)
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
    touched,
    isSubmitting,
    changeHandler,
    blurHandler,
    submitHandler,
  }
}
