import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import WReg from './pages/WReg/WReg.jsx'
import WLogin from './pages/Wlogin/Wlogin.jsx'
import Home from './pages/Home/Home.jsx'
import Days from './pages/Days/Days.jsx'
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth.js'
import FullPost from './pages/FullPost/FullPost.jsx'

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<WLogin/>}/>
        <Route path='/register' element={<WReg/>}/>
        <Route path='/days' element={<Days/>}/>
        <Route path='/days/:id' element={<FullPost/>}/>
      </Routes>
    </>
  )
}

export default App
