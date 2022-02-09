import React, {useEffect, useState} from 'react'
import validate from '../utils/validator'

export default function useForm(callback, inputValidationRules = {}) {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTouched, setIsTouched] = useState({})
  const [requestAction, setRequestAction] = useState('')

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback()
    }
    setIsSubmitting(false)
  }, [isSubmitting])

  const handleChange = event => {
    setValues(values => ({...values, [event.target.name]: event.target.value}))
    validateInput(event.target.name, event.target.value)
  }

  const validateInput = (name, value) => {
    if (inputValidationRules[name]) {
      const error = validate(name, value, inputValidationRules[name])
      let newErrors
      if (error.length === 0) {
        if (errors[name]) {
          delete errors[name]
        }
        newErrors = errors
      } else {
        newErrors = errors => ({...errors, [name]: error})
      }

      return setErrors(newErrors)
    }
  }

  const handleBlur = event => {
    setIsTouched(isTouched => ({...isTouched, [event.target.name]: true}))
  }

  const handleSubmit = event => {
    event.preventDefault()

    for (let input in inputValidationRules) {
      validateInput(input, values[input])
      setIsTouched(isTouched => ({...isTouched, [input]: true}))
    }

    setIsSubmitting(true)
  }

  return {
    values,
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    isSubmitting,
    isTouched,
    requestAction,
    setRequestAction
  }
}