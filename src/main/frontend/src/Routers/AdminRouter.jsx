import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRestaurantForm from '../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import Admin from '../AdminComponent/Admin/Admin'
import { useSelector } from 'react-redux'

const AdminRouter = () => {
const {restaurant}=useSelector(Store=>Store)
  return (
    <div>
      
      {console.log("restaurant=" ,restaurant)}
        <Routes>
            <Route path='/*' element={!restaurant.userRestaurants?(<CreateRestaurantForm/>):(<Admin/>)}/>
        </Routes>
    </div>
  );
}

export default AdminRouter