import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.scss'
import classNames from 'classnames/bind'
import InputControl from '../InputControl/InputControl'

const cn = classNames.bind(styles)

const InputText = (
  {
    type,
    name,
    value,
    id,
    inputClassName,
    label,
    labelClassName,
    placeholder,
    error,
    onChange,
    onBlur
  }) => {

  const inputCN = cn('input', `input-${type}`, inputClassName)
  const labelCN = cn('label', labelClassName)

  const labelAttr = {
    className: labelCN,
    htmlFor: id
  }

  const {inputType, ...attr} = {
    type: type,
    name: name,
    value: value,
    id: id,
    className: inputCN,
    placeholder: placeholder,
    onChange: onChange,
    onBlur: onBlur
  }

  useEffect(() => {
    return console.log('1111')
  })

  return (
    <InputControl>
      {label && <label {...labelAttr}>{label}</label>}
      {type === 'textarea'
        ? <textarea
          {...attr}
        />
        : <input
          {...inputType}
          {...attr}
        />
      }
      {error && <p key="email">{error}</p>}
    </InputControl>
  )
}

InputText.propTypes = {
  type: PropTypes.oneOf(['text', 'password', 'textarea']).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  id: (props, propName, componentName) => {
    if (props['label'] && (props[propName] === undefined || typeof (props[propName]) !== 'string')) {
      return new Error(`If the prop \`label\` is passed in \`${componentName}\`, then the prop \`${propName}\` cannot be \`${typeof (props[propName])}\``)
    }
  },
  inputClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
}

InputText.defaultProps = {
  type: 'text',
}

export default InputText