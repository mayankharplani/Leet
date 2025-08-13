import React, { useEffect } from 'react'
import {Route, Routes, Navigate } from "react-router-dom"
import {Toaster} from "react-hot-toast"
import {Loader} from "lucide-react"


import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import MainPage from './pages/MainPage.jsx'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(() => {
    checkAuth()
  },[checkAuth])

  if(isCheckingAuth && !authUser){   
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-start'>
      <Toaster/>
      <Routes>

        <Route
        path='/'
        element={<HomePage/> }
        />
        <Route
        path='/login'
        element={!authUser ? <LoginPage/> : <Navigate to={"/main"}/>}
        />
        <Route
        path='/signup'
        element={!authUser ? <SignUpPage/> : <Navigate to={"/main"}/>}
        />
        <Route 
        path='/main' 
        element={authUser ? <MainPage/> : <Navigate to={"/login"}/>} 
        /> 

      </Routes>
    </div>
  )
}

export default App