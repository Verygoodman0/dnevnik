import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import WReg from './pages/WReg/WReg.jsx'
import WLogin from './pages/Wlogin/Wlogin.jsx'
import Home from './pages/Home/Home.jsx'

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<WLogin/>}/>
        <Route path='/register' element={<WReg/>}/>
      </Routes>
    </>
  )
}

export default App
