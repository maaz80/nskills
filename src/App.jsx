import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Otp from './pages/login/Otp'
import UserDetailsForm from './pages/user-details-form/UserDetailsForm'
import Home from './pages/home/Home'
import ProtectedGuestRoute from './routes/ProtectedGuestRoute'
import PrivateRoute from './routes/PrivateRoute'
const App = () => {
  return (
    <div className='poppins-regular'>
      <Home/>
      {/* <Routes>
        <Route path='/login' element={
          <ProtectedGuestRoute>
            <Login />
          </ProtectedGuestRoute>
        } />
        <Route path='/otp' element={
          <ProtectedGuestRoute>
            <Otp />
          </ProtectedGuestRoute>
        } />
        <Route path='/user_details_form' element={
          <ProtectedGuestRoute>
            <UserDetailsForm />
          </ProtectedGuestRoute>
        } />
        <Route path='/' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
      </Routes> */}
    </div>
  )
}

export default App