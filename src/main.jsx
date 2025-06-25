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
import Create from './Components/Create.jsx';
import Myrecipe from './Components/Myrecipe.jsx'
import Update from './Components/Update.jsx'

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
      path:"/register",
      Component : Register
    },
    {
      path:"/Preparation",
      Component:Preparation
    },
    {
      path:"/Saved",
      Component:Saved
    },
    {
      path:"/Create",
      Component:Create
    },
    {
      path:"/Myrecipe",
      Component:Myrecipe
    },
    {
      path:"/Update",
      Component:Update
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
