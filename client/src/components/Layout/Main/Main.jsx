import React from 'react'
import styles from './Main.module.scss'

export default function Main(props) {
  return (
    <main className={styles.main}>
      {props.children}
    </main>
  )
}