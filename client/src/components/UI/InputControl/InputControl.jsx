import React from 'react'
import PropTypes from 'prop-types'
import styles from './InputControl.module.scss'
import classNames from 'classnames/bind'

const CRCN = 'input-control' //Component Root Class Name
const cn = classNames.bind(styles)

function InputControl({children}) {
  return (
    <div className={cn(CRCN)}>
      {children}
    </div>
  )
}

InputControl.propTypes = {
  children: PropTypes.node.isRequired
}

export default InputControl