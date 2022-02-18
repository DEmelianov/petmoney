import React from 'react'
import Container from '../Container/Container'
import TopNav from '../../TopNav/TopNav'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <TopNav/>
      </Container>
    </header>
  )
}