import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Otp from './pages/login/Otp'
import UserDetailsForm from './pages/user-details-form/UserDetailsForm'
import Home from './pages/home/Home'
const App = () => {
  return (
    <div className='poppins-regular'>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/otp' element={<Otp/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/user_details_form' element={<UserDetailsForm/>}/>
      </Routes>
    </div>
  )
}

export default App