import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from './Form.module.scss'
import {CSSTransition} from 'react-transition-group'
import useRenderCounter from '../../../../utils/renderCounter'

const cn = classNames.bind(styles)

const Form = ({title, children, loading, error, onSubmit}) => {
  const errorRef = useRef()
  const nodeRef = useRef(null)

  useRenderCounter(`Form`)

  return (
    <form
      className={cn('form', {'loading': !!loading})}
      onSubmit={onSubmit}
    >
      {title && <div className={cn('title')}>
        {title}
      </div>}
      {children}
      <CSSTransition
        nodeRef={nodeRef}
        timeout={700}
        classNames={{
          enter: cn(['error-enter']),
          enterActive: cn(['error-enter-active']),
          exit: cn(['error-exit-active']),
          exitActive: cn(['error-exit-active']),
        }}
        in={!!error}
        onEnter={() => {
          errorRef.current = error
        }}
        unmountOnExit
      >
        {() =>
          <div ref={nodeRef} className={cn('error')}>{errorRef.current}</div>
        }
      </CSSTransition>
    </form>
  )
}

Form.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  onSubmit: PropTypes.func
}

export default Form