import { Button, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { LoginUser } from '../State/Authentication/Action'
const initialValue={
    email:"",
    password:""
}
const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit=(values)=>{
        dispatch(LoginUser({userData:values,navigate}))
    };
  return (
    <div className=''>
        
        <Typography variant='h5' className='text-center'>
            Login
        </Typography>

        <Formik onSubmit={handleSubmit} initialValues={initialValue}>
            <Form >

            <Field
                    as={TextField}
                    name="email"
                    label="email"
                    fullWidth
                    variant="outlined"
                    margin="normal"
            />
            
            <Field
                    as={TextField}
                    name="password"
                    label="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    type="password"
                    
            />
            <Button fullWidth type='submit' variant='contained'sx={{mt:2,padding:"1rem"}} >Login</Button>

            </Form>
        </Formik>
        <Typography variant='body2' align='center' sx={{mt:3}}>
            Don't have an account?
            <Button size='small' onClick={()=> navigate("/account/register")} > Register </Button>
        </Typography>

    </div>
  )
}

export default LoginForm