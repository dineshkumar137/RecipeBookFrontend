import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Login from './Components/Login.jsx'
import Register from './Components/Register.jsx'
import Header from './Components/Header.jsx'
import Preparation from './Components/Preparation.jsx'
import Saved from './Components/Save.jsx'
import { UserProvider } from './contexts/userContext.jsx';

const router = createBrowserRouter(
  [
    {
      path:"/",
      Component : App
    },
    {
      path:"/Login",
      Component : Login
    },
    {
      path:"/Register",
      Component : Register
    },
    {
      path:"/Preparation",
      Component:Preparation
    },
    {
      path:"/Saved",
      Component:Saved
    }
  ]
)
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <UserProvider>
        <RouterProvider router={router}/>
    </UserProvider>
  </React.StrictMode>,
)
