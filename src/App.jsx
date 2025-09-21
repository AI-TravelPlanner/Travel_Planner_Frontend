import './index.css'
import React from 'react'
import Layout from './layout/Layout'
import AppRoutes from './layout/AppRoutes'
import { BrowserRouter } from 'react-router'

function App() {


  return (
    <>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
