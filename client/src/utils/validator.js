export function isRequired(value) {
  return value !== null && value.trim().length > 0
}

export function isSame(value1, value2) {
  return value1 === value2
}

export function isEmail(value) {
  if (value && value !== '') {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regExp.test(value)
  }

  return true
}

export function minLength (length, value) {
  return value.length >= length
}

export function maxLength (length, value) {
  return value.length <= length
}

export function validate(validateRules, values) {
  if (validateRules.length > 0) {
    const errors = validateRules
      .map(validation => validation(values))
      .filter(validation => typeof validation === 'object')
    return errors.reduce((errors, error) => ({...errors, ...error}), {})
  }
}

// export default function validate(name, values, rules = []) {
//   const validationRules = (rules) => {
//     try {
//       switch (rules) {
//         case 'required': {
//           if (!values[name] || values[name] === '') {
//             errors.push(`${name[0].toUpperCase() + name.substring(1)} is required`)
//           }
//           break
//         }
//         case 'email': {
//           const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//           if (!regExp.test(values[name])) {
//             errors.push(`Enter correct ${name}`)
//           }
//           break
//         }
//         case 'minLength8': {
//           if (values[name] && values[name].length <= 8) {
//             errors.push(`${name[0].toUpperCase() + name.substring(1)} should contains at least 8 characters`)
//           }
//           break
//         }
//         case 'maxLength20': {
//           if (values[name] && values[name].length >= 20) {
//             errors.push(`${name[0].toUpperCase() + name.substring(1)} cannot contain more than 20 characters`)
//           }
//           break
//         }
//         case 'password' : {
//           if (!values[name] || values[name].length < 6) {
//             errors.push(`${name[0].toUpperCase() + name.substring(1)} should contains at least 6 characters`)
//           }
//           break
//         }
//         /*case 'passwordConfirm' : {
//           if (!value || value.length < 6) {
//             errors.push(`${name[0].toUpperCase() + name.substring(1)} should contains at least 8 characters`)
//           }
//           break
//         }*/
//         default: {
//           throw new Error('Undefined validation rule')
//         }
//       }
//       return errors
//     } catch (e) {
//       console.error(e.message)
//     }
//   }
//
//   const errors = []
//
//   if (Array.isArray(rules) && rules.length) {
//     rules.forEach((item) => {
//       validationRules(item)
//     })
//   } else if (typeof rules === 'string') {
//     validationRules(rules)
//   }
//
//   return errors
// }