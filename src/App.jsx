import { useState } from 'react'

import './App.css'
import Login from './Components/Login.jsx';4
import Register from './Components/Register.jsx';
import Header from './Components/Header.jsx'
import Mainpage from './Components/Mainpage.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Mainpage/>
    </>
  )
}

export default App
