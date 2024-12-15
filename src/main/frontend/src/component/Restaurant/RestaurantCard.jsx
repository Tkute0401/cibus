import { Card, Chip, IconButton } from '@mui/material'
import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite } from '../State/Authentication/Action';
import { isPresentInFavorites } from '../Confiig/logic';

const RestaurantCard = ({item}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {auth,restaurant} = useSelector(Store=>Store );
  const jwt = localStorage.getItem("jwt");
  const restaurantId = restaurant.restaurant?.id;
  const isFavorites = auth.favorites.includes(item.id);
  console.log("restaurantin card",restaurant)
  console.log("restaurantId",restaurantId);
  const handleAddtoFavorite = () => {
    dispatch(addToFavorite({restaurantId,jwt}));
  }
  
  const handleNavigateToRestaurant =() =>{
    if(item.open){
      console.log('Navigating to restaurant...');
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
    }
  }
  return (  
    <Card className='w-[18rem]'>
      <div className='relative'>
        <img className='w-full h-[10rem] rounded-t-md object-cover' src={item.images[0]} alt="" />
        <Chip 
          size='small' 
          className='absolute top-2 left-2' 
          color={restaurant.restaurant?.open?'success':'error'} 
          label={restaurant.restaurant?.open?"open":"closed"}/>
      </div>
      <div className='p-4 textPart lg:flex w-full justify-between'>
        <div className='space-y-1'>
          <p  onClick={handleNavigateToRestaurant} className='font-semibold text-lg cursor-pointer'>{item.name? item.name:item.title}</p>
          <p onClick={handleNavigateToRestaurant} className='text-gray-500 text-sm'>
            {item.description}
          </p>
        </div>
        <div>
        <IconButton onClick={handleAddtoFavorite}>
            {isPresentInFavorites(auth.favorites, item) ? (
              <FavoriteIcon color="primary" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        </div>
      </div>
    </Card>
  ) 
}

export default RestaurantCard