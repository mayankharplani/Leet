import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { toast } from 'react-toastify';

const LogoutButton = ({children}) => {
    const {logout} = useAuthStore();

    const onLogout = async () => {
        try {
          await logout()
        } catch (error) {
          console.error("Error Logout", error)
        }
    }

  return (
    <button onClick={onLogout} className="flex gap-3 navbar cursor-pointer text-gray-300  px-3 py-1 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:text-white hover:bg-gray-800 transition-colors duration-200 nav-item-hover" >
        {children}
    </button>
  )
}

export default LogoutButton