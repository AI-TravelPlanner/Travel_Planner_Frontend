import './index.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import AuthPage from '@/SignIn/SignInPage';
import PageNotFound from './layout/PageNotFound';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
