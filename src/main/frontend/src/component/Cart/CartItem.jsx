import React from 'react'
import IconButton from '@mui/material/IconButton'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Chip, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeCartItem, updateCartItem } from '../State/Cart/Action';
const CartItem = ({item}) => {
    const{auth,cart}=useSelector(Store => Store);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");
    
    const handleRemoveCartItem = () => {
        dispatch(removeCartItem({ cartItemId:item.id,jwt}));
    }
    const handleUpdateCartItem = (value) => {
        if(value===-1 && item.quantity===1){
            handleRemoveCartItem();
        }
        const data = {cartItemId:item.id,quantity:item.quantity+value,token:jwt}
        console.log("data sat",data);
        dispatch(updateCartItem({data}));
    }

    return (
        <div className='px-5 pt-2'>
            <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    <img className='w-[5rem] h-[5rem] object-cover' src={item.food.images[0]} alt="" />
                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-y-3 w-full'>
                        <p>{item?.food?.name}</p>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-1'>
                                <IconButton onClick={() => handleUpdateCartItem(-1)}> 
                                    <RemoveCircleOutlineIcon/>                                    
                                </IconButton>
                                <div className='w-5 h-5 tet-xs flex items-center justify-center'>
                                    {item?.quantity}
                                </div>
                                <IconButton onClick={() => handleUpdateCartItem(1)}>
                                    <AddCircleOutlineIcon/>                                  
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <p>₹{item?.totalPrice}</p>
                </div>
            </div>
            <div className='pt-3 space-x-2 pb-2'>
                {item.ingredients?.map((item)=><Chip label={item.name}/>)}
            </div>
            <Divider/>
        </div>
    )
}

export default CartItem