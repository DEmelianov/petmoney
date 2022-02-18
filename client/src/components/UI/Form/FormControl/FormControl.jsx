import React from 'react'
import styles from './FormControl.module.scss'
import classNames from 'classnames/bind'
import PropTypes from 'prop-types'

const cn = classNames.bind(styles)

const FormControl = ({children, justify}) => {
  return (
    <div className={cn('form-control', {[`justify_${justify}`]: justify})}>
      {children}
    </div>
  )
}

FormControl.propTypes = {
  justify: PropTypes.oneOf(['start', 'center', 'end'])
}

export default FormControl