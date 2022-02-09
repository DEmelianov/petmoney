import React from 'react'
import {useLocation} from "react-router-dom";
import Container from "../components/Layout/Container/Container";

export default function Page404() {
  const location = useLocation();

  return (
    <Container>
      404 <code>{location.pathname}</code>
    </Container>
  )
}