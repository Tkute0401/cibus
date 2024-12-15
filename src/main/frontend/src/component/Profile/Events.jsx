import React, { useEffect } from 'react'
import EventCard from './EventCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../State/Restaurant/Action'

const Events = () => {
  const{ auth,cart,restaurant }=useSelector(Store=>Store)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvents({jwt:auth.jwt||localStorage.getItem("jwt")}));
  },[])
  return (
    <div className='mt-5 px-5 flex flex-wrap gap-5'>
      {console.log("auth",auth,cart,restaurant)}
      {
        
        restaurant.event.map((item)=><EventCard item={item}/>)
      }
    </div>
  )
}

export default Events