import React, {useState} from 'react'
import Container from '../../components/Layout/Container/Container'
import RegForm from '../../components/Forms/RegForm/RegForm'
import Col from '../../components/Layout/Col/Col'
import Row from '../../components/Layout/Row/Row'
import styles from './Auth.module.scss'
import classNames from 'classnames/bind'
import AuthForm from '../../components/Forms/AuthForm/AuthForm'

const cn = classNames.bind(styles)

export default function Auth() {
  const [activeForm, setActiveForm] = useState('auth')

  return (
    <Container>
      <Row
        justify="center"
        align="start"
        rowGap="2x"
        colGap="2x"
      >
        <Col col="3">
          <div className={cn('form-switcher')}>
            <div
              className={cn('form-switcher-item', 'auth', {'active': activeForm === 'auth'})}
              onClick={() => setActiveForm('auth')}
            >
              Авторизация
              <div className={cn('arrow', 'arrow-left')}/>
            </div>
            <div
              className={cn('form-switcher-item', 'reg', {'active': activeForm === 'reg'})}
              onClick={() => setActiveForm('reg')}
            >
              Регистрация
              <div className={cn('arrow', 'arrow-right')}/>
            </div>
          </div>
          {/*{activeForm === 'reg' && <RegForm/>}*/}
          {activeForm === 'auth' && <AuthForm/>}
        </Col>
      </Row>
    </Container>
  )
}