import React from 'react'
import Container from '../Container/Container'
import styles from './Footer.module.scss'

export default function Footer({children}) {
  return (
    <footer className={styles.footer}>
      <Container>
        {children}
      </Container>
    </footer>
  )
}