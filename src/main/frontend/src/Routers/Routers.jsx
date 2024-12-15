import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRouter from './AdminRouter'
import CustomerRouter from './CustomerRouter'
import { NavBar } from '../component/NavBar/NavBar'

const Routers = () => {
  return (
    <>
        <Routes>
            <Route path='/admin/restaurant/*' element={<AdminRouter/>}/>
            <Route path='/*' element={<CustomerRouter/>}/>
        </Routes>
    </>
  )
}

export default Routers