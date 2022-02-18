import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import Header from './components/Layout/Header/Header'
import Main from './components/Layout/Main/Main'
import Footer from './components/Layout/Footer/Footer'
import Layout from './components/Layout/Layout/Layout'
import useRenderCounter from './utils/renderCounter'

function App() {
  const routes = useRoutes(true)

  useRenderCounter('App')

  return (
    <Router>
      <Layout>
        <Header/>
        <Main>
          {routes}
        </Main>
        <Footer>
          Footer
        </Footer>
      </Layout>
    </Router>
  )
}

export default App
