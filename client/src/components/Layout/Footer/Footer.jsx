import React from 'react'
import Container from '../Container/Container'

export default function Footer(props) {
  return (
    <footer>
      <Container>
        {props.children}
      </Container>
    </footer>
  )
}