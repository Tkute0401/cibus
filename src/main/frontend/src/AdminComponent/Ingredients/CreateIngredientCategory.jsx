import React from "react";
import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createIngredientsCategory } from "../../component/State/Ingredients/Action";

// Validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(30, "Category name cannot exceed 30 characters")
    .matches(
      /^[a-zA-Z0-9\s-]+$/,
      "Category name can only contain letters, numbers, spaces, and hyphens"
    )
    .test(
      "no-consecutive-spaces",
      "Category name cannot contain consecutive spaces",
      value => !value || !/\s\s/.test(value)
    )
    .trim()
});

const CreateIngredientCategoryForm = ({ handleClose }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const initialValues = {
    name: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      if (!restaurant?.restaurant?.id) {
        throw new Error("Restaurant ID is required");
      }

      const data = {
        name: values.name.trim(),
        restaurantId: restaurant.restaurant.id,
      };

      await dispatch(createIngredientsCategory({ 
        data, 
        jwt: auth.jwt || jwt 
      }));

      resetForm();
      handleClose();
    } catch (error) {
      setStatus({ 
        error: error.message || "Failed to create ingredient category" 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-gray-400 text-center text-xl pb-10">
        Create Ingredient Category
      </h1>
      
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
              id="name"
              name="name"
              label="Category Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
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
              className={`w-full ${isSubmitting ? 'opacity-50' : ''}`}
            >
              {isSubmitting ? "Creating..." : "Create Category"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateIngredientCategoryForm;