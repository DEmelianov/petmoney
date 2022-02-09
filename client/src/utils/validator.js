export default function validate(name, value, rules = []) {
  const validationRules = (rules) => {
    try {
      switch (rules) {
        case 'required': {
          if (!value || value === '') {
            errors.push(`${name[0].toUpperCase() + name.substring(1)} is required`)
          }
          break
        }
        case 'email': {
          const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if (!regExp.test(value)) {
            errors.push(`Enter correct ${name}`)
          }
          break
        }
        case 'minLength8': {
          if (value && value.length <= 8) {
            errors.push(`${name[0].toUpperCase() + name.substring(1)} should contains at least 8 characters`)
          }
          break
        }
        case 'maxLength20': {
          if (value && value.length >= 20) {
            errors.push(`${name[0].toUpperCase() + name.substring(1)} cannot contain more than 20 characters`)
          }
          break
        }
        case 'password' : {
          if (!value || value.length < 6) {
            errors.push(`${name[0].toUpperCase() + name.substring(1)} should contains at least 8 characters`)
          }
          break
        }
        default: {
          throw new Error('Undefined validation rule')
        }
      }
      return errors
    } catch (e) {
      console.error(e.message)
    }
  }

  const errors = []

  if (Array.isArray(rules) && rules.length) {
    rules.forEach((item) => {
      validationRules(item)
    })
  } else if (typeof rules === 'string') {
    validationRules(rules)
  }

  return errors
}