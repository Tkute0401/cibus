import { Button, InputLabel, MenuItem, Select, TextField, Typography, FormControl } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../State/Authentication/Action';
import * as Yup from 'yup';

const initialValue = {
    name: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER"
};

const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    role: Yup.string().required("Role is required")
});

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        const { name, email, password, role } = values;
        const userData = { name, email, password, role };
        console.log('fullName:', name);
        dispatch(registerUser({ userData, navigate }));
    };

    return (
        <div>
            <Typography variant='h5' className='text-center'>
                Register
            </Typography>

            <Formik 
                onSubmit={handleSubmit} 
                initialValues={initialValue} 
                validationSchema={validationSchema}
            >
                {({ errors, touched }) => (
                    <Form className='gap-2'>
                        <Field
                            as={TextField}
                            name="name"
                            label="Full Name"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                        />

                        <Field
                            as={TextField}
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        <Field
                            as={TextField}
                            name="password"
                            label="Password"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type="password"
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="role-simple-select-label">Role</InputLabel>
                            <Field
                                as={Select}
                                labelId="role-simple-select-label"
                                id="role-simple-select"
                                name="role"
                            >
                                <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                                <MenuItem value="ROLE_RESTAURENT_OWNER">Restaurant Owner</MenuItem>
                            </Field>
                        </FormControl>

                        <Button fullWidth type='submit' variant='contained' sx={{ mt: 2, padding: "1rem" }}>Register</Button>

                        <Typography variant='body2' align='center' sx={{ mt: 3 }}>
                            Already have an account?
                            <Button size='small' variant="text" onClick={() => navigate("/account/login")}>Login</Button>
                        </Typography>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;
