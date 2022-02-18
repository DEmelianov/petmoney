import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Col.module.scss'
import rowStyles from '../Row/Row.module.scss'

const cn = classNames.bind(styles)

const Col = ({children, col}) => {

  return (
    <div
      className={cn(
        rowStyles.col,
        'col',
        {[`col-${col}`]: col}
      )}
    >
      {children}
    </div>
  )
}

Col.propTypes = {
  col: function (props, propName, componentName) {
    if (!/^[1-9][0-1]?$/.test(props[propName])) {
      return new Error(`Invalid prop \`${propName}\` of value \`${props[propName]}\` supplied to \`${componentName}\`, expected string with numeric value in [1-11] range`)
    }
  },
  children: PropTypes.node
}

/*Col.defaultProps = {
  col: 'col'
}*/

export default Col