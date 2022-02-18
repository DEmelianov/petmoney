import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'
import styles from './InputText.module.scss'
import classNames from 'classnames/bind'
import {CSSTransition} from 'react-transition-group'
import useRenderCounter from '../../../utils/renderCounter'

const cn = classNames.bind(styles)

const InputTextControl = ({children}) => {
  return (
    <div className={cn('input-control')}>
      {children}
    </div>
  )
}

InputTextControl.propTypes = {
  children: PropTypes.node.isRequired
}

const InputText = (
  {
    type,
    name,
    value,
    id,
    label,
    error,
    onChange,
  }) => {

  useRenderCounter(`InputText ${name}`)

  const [touched, setTouched] = useState(false)
  const [labelActive, setLabelActive] = useState(false)

  const errorRef = useRef()
  const nodeRef = useRef(null)

  const onBlurHandler = () => {
    setTouched(true)
    if (!value) {
      setLabelActive(false)
    }
  }

  const onFocusHandler = () => {
    setLabelActive(true)
  }

  const {inputType, ...inputAttr} = {
    type,
    name,
    value,
    id,
    className: cn('input', {'invalid': !!error && touched}),
    autoComplete: 'off',
    onChange,
    onBlur: onBlurHandler,
    onFocus: onFocusHandler
  }

  return (
    <InputTextControl>
      {type === 'textarea'
        ? <textarea
          {...inputAttr}
        />
        : <input
          {...inputType}
          {...inputAttr}
        />
      }
      {
        label &&
        <label
          className={cn('label', {'active': labelActive || value})}
          htmlFor={id}
        >
          {label}
        </label>
      }

      {
        <CSSTransition
          nodeRef={nodeRef}
          timeout={700}
          classNames={{
            enter: cn(['error-enter']),
            enterActive: cn(['error-enter-active']),
            exit: cn(['error-exit-active']),
            exitActive: cn(['error-exit-active']),
          }}
          in={!!error && !!touched}
          onEnter={() => {
            errorRef.current = error
          }}
          unmountOnExit
        >
          {() =>
            <div ref={nodeRef} className={cn('error')}>{errorRef.current}</div>
          }
        </CSSTransition>

      }
    </InputTextControl>
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
  label: PropTypes.string,
  onChange: PropTypes.func,
}

InputText.defaultProps = {
  type: 'text',
}

export default InputText