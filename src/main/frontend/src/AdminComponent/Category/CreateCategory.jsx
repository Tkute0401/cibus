// CreateCategory.jsx
import React from 'react';
import { TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../component/State/Restaurant/Action';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Validation schema
const validationSchema = Yup.object().shape({
  categoryName: Yup.string()
    .required('Category name is required')
    .min(2, 'Category name must be at least 2 characters')
    .max(30, 'Category name cannot exceed 30 characters')
    .matches(
      /^[a-zA-Z0-9\s-]+$/,
      'Category name can only contain letters, numbers, spaces, and hyphens'
    )
    .test(
      'no-consecutive-spaces',
      'Category name cannot contain consecutive spaces',
      value => !value || !/\s\s/.test(value)
    )
    .trim()
});

const CreateCategory = ({ handleClose }) => {
  
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");
  const  id = restaurant.userRestaurants.id;



  const initialValues = {
    categoryName: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      if (!id) {
        throw new Error("Restaurant ID is required");
      }

      const data = {
        name: values.categoryName.trim(),
        restaurant: {
          id
        }
      };

      await dispatch(createCategory(data, auth.jwt || jwt));
      resetForm();
      handleClose();
    } catch (error) {
      setStatus({
        error: error.message || "Failed to create category"
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-gray-400 text-center text-xl pb-10">Create Category</h1>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          status,
        }) => (
          <Form className="space-y-5">
            <TextField
              fullWidth
              id="categoryName"
              name="categoryName"
              label="Category Name"
              value={values.categoryName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.categoryName && Boolean(errors.categoryName)}
              helperText={touched.categoryName && errors.categoryName}
              disabled={isSubmitting}
              inputProps={{
                maxLength: 30,
              }}
            />

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
              fullWidth
            >
              {isSubmitting ? "Creating..." : "Create Category"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCategory;