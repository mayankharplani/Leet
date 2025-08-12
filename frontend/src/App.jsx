import React from 'react'
import {Route, Routes, Navigate } from "react-router-dom"
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
const App = () => {
  let authUser = null;
  return (
    <div className='flex flex-col items-center justify-start'>
      <Routes>

        <Route
        path='/'
        element={<HomePage/>}
        />
        <Route
        path='/login'
        element={!authUser ? <LoginPage/> : <Navigate to={"/"}/>}
        />
        <Route
        path='/signup'
        element={!authUser ? <SignUpPage/> : <Navigate to={"/"}/>}
        />

      </Routes>
    </div>
  )
}

export default App