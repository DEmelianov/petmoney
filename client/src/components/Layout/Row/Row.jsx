import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Row.module.scss'

const cn = classNames.bind(styles)

const Row = ({children, colGap, rowGap, justify, align}) => {
  return (
    <div
      className={cn(
        'row',
        {[`row-gap_${rowGap}`]: rowGap},
        {[`col-gap_${colGap}`]: colGap},
        {[`justify_${justify}`]: justify},
        {[`align_${align}`]: align},
      )}
    >
      {children}
    </div>
  )
}

Row.propTypes = {
  colGap: PropTypes.oneOf(['1x', '2x', '3x']),
  rowGap: PropTypes.oneOf(['1x', '2x', '3x']),
  justify: PropTypes.oneOf(['start', 'center', 'end', 'between', 'around']),
  align: PropTypes.oneOf(['start', 'center', 'end'])
}

Row.defaultProps = {
  colGap: '1x',
  rowGap: '1x'
}


export default Row