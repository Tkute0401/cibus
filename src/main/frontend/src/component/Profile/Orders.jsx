import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '../State/Order/Action';

const Orders = () => {
  const {auth,cart,order} = useSelector(Store=>Store)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  console.log("order",order.orders);
  useEffect(() => {
    dispatch(getUserOrders(jwt));
  },[]);

  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-xl text-center py-7 font-semibold'>Order  History</h1>
      <div className='space-y-5 w-full lg:w-1/2'>
        {
          
          order.orders?.map((order)=> order.orderItems.map((item)=><OrderCard item={item} order={order} />))
        }
      </div>
    </div>
  )
}

export default Orders