import './App.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from './Theme/DarkTheme';
import CustomerRouter from './Routers/CustomerRouter';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from './component/State/Authentication/Action';
import { findCart } from './component/State/Cart/Action';
import Routers from './Routers/Routers';
import { getAllReastaurantsAction, getRestaurantByUserId } from './component/State/Restaurant/Action';
function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const {auth,cart,restaurant} = useSelector(Store => Store); 
  useEffect(()=>{
    dispatch(GetUser(auth.jwt || jwt));
    dispatch(getAllReastaurantsAction(auth.jwt || jwt));
    dispatch(getRestaurantByUserId(auth.jwt || jwt));
    dispatch(findCart(auth.jwt || jwt));
  },[auth.jwt]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Routers/>
    </ThemeProvider>
  );
}

export default App;
