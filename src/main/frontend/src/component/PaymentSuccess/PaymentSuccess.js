import React, { useEffect } from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { green } from '@mui/material/colors';
import { Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../State/Cart/Action';
import { useDispatch } from 'react-redux';
const PaymentSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(clearCart());
    },[])
  return (
    <div className='min-h-screen px-5'>
        <div className='flex flex-col items-center justify-center h-[90vh]'>
            <Card className='box w-full lg:w-1/3 flex flex-col items-center rounded-md p-5 m-7'>
                <TaskAltIcon sx={{fontSize:"10rem",color:green[500]}}/>
                <h1 className='text-2xl font-semibold py-5'>Payment Successful !</h1>
                <p className='text-gray-400 py-3 text-center'>Thank you for your order.please wait while we work our magic....</p><br/>
                <p className='text-gray-400 py-3 text-center'>You can track your order in the <a className='text-blue-600 cursor-pointer' onClick={()=>navigate("/my-profile/orders")}> my orders </a>section</p><br/>
                <p className='text-gray-300 py-2 text-center text-lg'>Have a Great Day</p><br/>
                <Button variant="contained" classname="py-5" sx={{margin:"1rem 0rem"}} onClick={()=>navigate("/")}> go to home </Button>
            </Card>

        </div>
    </div>
  )
}

export default PaymentSuccess