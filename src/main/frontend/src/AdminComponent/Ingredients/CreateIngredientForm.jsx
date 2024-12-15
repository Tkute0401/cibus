import React from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { createIngredients } from '../../component/State/Ingredients/Action';

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Ingredient name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .matches(
      /^[a-zA-Z0-9\s-]+$/,
      'Name can only contain letters, numbers, spaces, and hyphens'
    )
    .trim(),
  categoryId: Yup.string()
    .required('Category is required')
});

const CreateIngredientForm = ({ handleClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, restaurant, ingredients } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");

  const initialValues = {
    name: '',
    categoryId: ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      if (!restaurant.restaurant?.id) {
        throw new Error("Restaurant ID is required");
      }

      const data = {
        ...values,
        name: values.name.trim(),
        restaurantId: restaurant.restaurant?.id
      };

      await dispatch(createIngredients({
        data: data,
        jwt: auth.jwt || jwt
      }));

      resetForm();
      handleClose();
    } catch (error) {
      setStatus({ error: error.message || 'Failed to create ingredient' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Ingredient
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            touched,
            values,
            handleChange,
            handleBlur,
            isSubmitting,
            status
          }) => (
            <Form className="space-y-5">
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Ingredient"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                disabled={isSubmitting}
              />

              <FormControl 
                fullWidth 
                error={touched.categoryId && Boolean(errors.categoryId)}
              >
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="categoryId"
                  name="categoryId"
                  value={values.categoryId}
                  label="Category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                >
                  {ingredients.category.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                {touched.categoryId && errors.categoryId && (
                  <FormHelperText>{errors.categoryId}</FormHelperText>
                )}
              </FormControl>

              {status && status.error && (
                <div className="text-red-500 text-sm mt-2">
                  {status.error}
                </div>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                className="mt-4"
              >
                {isSubmitting ? 'Creating...' : 'Create'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateIngredientForm;