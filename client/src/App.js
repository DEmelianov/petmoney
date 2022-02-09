import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import Header from './components/Layout/Header/Header'
import Main from './components/Layout/Main/Main'
import Footer from './components/Layout/Footer/Footer'

function App() {
  const routes = useRoutes(true)

  return (
    <Router>
      <Header/>
      <Main>
        {routes}
      </Main>
      <Footer>
        Footer
      </Footer>
    </Router>
  )
}

export default App
