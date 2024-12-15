import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import CartItem from './CartItem';
import AddressCard from './AddressCard';
import { Box, Button, Card, Grid, Modal, TextField } from '@mui/material';
import AddLocationTwoToneIcon from '@mui/icons-material/AddLocationTwoTone';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Order/Action';
import { findCart } from '../State/Cart/Action';
import e from 'express';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#000000', // Black color using hex
  boxShadow: 24,
  outline: 'none',
  p: 4,
};


const initialValues = {
  streetAddress: '',
  state: '',
  postalCode: '',
  city: '',
};

const validationSchema = Yup.object({
  streetAddress: Yup.string().required('Street Address is required'),
  state: Yup.string().required('State is required'),
  postalCode: Yup.number().required('postalCode should be number And required'),
  city: Yup.string().required('City is required'),
});

const Cart = () => {
  
  const [orderAddress, setOrderAddress] = useState({});
  const [restaurantAddress, setRestaurantAddress] = useState({});
  const [isCityMatch, setIsCityMatch] = useState(false);

  const handleOpenAddressModel = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const {cart,auth} = useSelector(Store => Store);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(findCart(localStorage.getItem("jwt")));
  },[])
  console.log("name",auth.user?.name);
  console.log("restaurantId=",cart.cartItems[0]?.food?.restaurant.id);
    const handleSubmit = (values) => {
    const data = {
      token:localStorage.getItem("jwt"),
      order:{
        restaurantId:cart.cartItems[0]?.food?.restaurant.id,
        restaurantAddress:cart.cartItems[0]?.food?.restaurant.address,
        deliveryAddress:{
          name:auth.user?.name,
          streetAddress:values.streetAddress,
          city:values.city,
          state:values.state,
          postalCode:values.postalCode,
          country:"India"
        }
      }
    }
    if(values.city === cart.cartItems[0]?.food?.restaurant.address.city){
    dispatch(createOrder(data))
  }
    console.log('Form value', values);
  };
  const createOrderUsingSelectedAddress = (address) => {
    const data = {
      token:localStorage.getItem("jwt"),
      order:{
        restaurantId:cart.cartItems[0]?.food?.restaurant.id,
        deliveryAddress:address,
      }
    }
    if(address.city === cart.cartItems[0]?.food?.restaurant.address.city){
    dispatch(createOrder(data));
    console.log('Order created');
    }
    else{
      alert("City doesn't match");
    }
  };
  const handleSelectAddress = (address) => {
    createOrderUsingSelectedAddress(address)
    handleClose()
  };

  return (
    <>
      <main className="lg:flex justify-between ">
        <section className="lg:w-[30%] lg:min-h-screen pt-10">
          {/* Updated with unique 'key' prop using item.id */}
          {cart.cartItems.map((item) => (
            <CartItem item={item} />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm ">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>₹{cart.cart?.total}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Charges</p>
                <p>₹20</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Platform Charges</p>
                <p>₹9</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Gst & Restaurant Charges</p>
                <p>₹{cart.cart?.total*0.18}</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Grand Total</p>
                <p>₹{cart.cart?.total + 20 + 9 + cart.cart?.total*0.18}</p>
              </div>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {/* Updated with unique 'key' prop using address.id */}
              {console.log("address in cart",auth.user?.addresses)}
              {auth.user?.addresses?.map((address) => (
                <AddressCard
                  key={address.id}
                  handleSelectAddress={handleSelectAddress}
                  item={address}
                  ShowButton={true}
                />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationTwoToneIcon />
                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    Add New Address
                  </h1>
                  <Button variant="outlined" onClick={handleOpenAddressModel}>
                    Add
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    error={Boolean(ErrorMessage('streetAddress'))}
                    helperText={
                      <ErrorMessage
                        name="streetAddress"
                        component="div"
                        className="text-red-600"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    error={Boolean(ErrorMessage('state'))}
                    helperText={
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-red-600"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="postalCode"
                    label="postalCode"
                    fullWidth
                    variant="outlined"
                    error={Boolean(ErrorMessage('postalCode'))}
                    helperText={
                      <ErrorMessage
                        name="postalCode"
                        component="div"
                        className="text-red-600"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    error={Boolean(ErrorMessage('city'))}
                    helperText={
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-600"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    color="primary"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
