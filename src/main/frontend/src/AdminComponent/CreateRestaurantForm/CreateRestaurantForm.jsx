import React, { useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createRestaurant } from "../../component/State/Restaurant/Action";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from "../utils/UploadToCloudnary";
import { CircularProgress, IconButton, FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { object, string, array } from "yup";

const initialValues = {
  name: "",
  description: "",
  cuisine_type: "",
  streetAddress: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  email: "",
  mobile: "",
  twitter: "",
  instagram: "",
  opening_hours: "Mon-Sun: 9:00 AM - 9:00 PM",
  images: [],
};

const validationSchema = object().shape({
  name: string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  description: string()
    .required("Description is required")
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be less than 500 characters"),
  cuisine_type: string()
    .required("Cuisine Type is required")
    .min(3, "Cuisine type must be at least 3 characters"),
  streetAddress: string()
    .required("Street Address is required")
    .min(5, "Street address must be at least 5 characters"),
  city: string()
    .required("City is required")
    .min(2, "City must be at least 2 characters"),
  state: string()
    .required("State is required")
    .min(2, "State must be at least 2 characters"),
  postal_code: string()
    .required("Postal Code is required")
    .matches(/^[0-9a-zA-Z\s-]{3,10}$/, "Invalid postal code format"),
  country: string()
    .required("Country is required")
    .min(2, "Country must be at least 2 characters"),
  email: string()
    .email("Invalid email format")
    .required("Email is required"),
  mobile: string()
    .required("Mobile is required")
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Invalid phone number format"),
  twitter: string()
    .url("Invalid Twitter URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
  instagram: string()
    .url("Invalid Instagram URL")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
  opening_hours: string()
    .required("Opening Hours is required")
    .min(5, "Please provide valid opening hours"),
  images: array()
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed"),
});

const CreateRestaurantForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const [uploadImage, setUploadingImage] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    const data = {
      name: values.name,
      description: values.description,
      cuisine_type: values.cuisine_type,
      address: {
        streetAddress: values.streetAddress,
        city: values.city,
        state: values.state,
        postal_code: values.postal_code,
        country: values.country,
      },
      contactInformation: {
        email: values.email,
        mobile: values.mobile,
        twitter: values.twitter,
        instagram: values.instagram,
      },
      opening_hours: values.opening_hours,
      images: values.images,
    };
    dispatch(createRestaurant({ data, token }));
    setSubmitting(false);
    navigate("/");
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      formik.setFieldError("images", "Image size must be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      formik.setFieldError("images", "Please upload only image files");
      return;
    }

    setUploadingImage(true);
    try {
      const image = await uploadToCloudinary(file);
      if (formik.values.images.length >= 5) {
        formik.setFieldError("images", "Maximum 5 images allowed");
        return;
      }
      formik.setFieldValue("images", [...formik.values.images, image]);
    } catch (error) {
      formik.setFieldError("images", "Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl w-full">
        <h1 className="font-bold text-2xl text-center py-2">
          Add New Restaurant
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            <Grid className="flex flex-wrap gap-5" item xs={12}>
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              
              <label className="relative" htmlFor="fileInput">
                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600">
                  <AddPhotoAlternateIcon className="text-white" />
                </span>
                {uploadImage && (
                  <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                    <CircularProgress />
                  </div>
                )}
              </label>

              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      className="w-24 h-24 object-cover"
                      src={image}
                      alt={`Restaurant ${index + 1}`}
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                    >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
              {formik.touched.images && formik.errors.images && (
                <FormHelperText error>{formik.errors.images}</FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="cuisine_type"
                name="cuisine_type"
                label="Cuisine Type"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cuisine_type}
                error={formik.touched.cuisine_type && Boolean(formik.errors.cuisine_type)}
                helperText={formik.touched.cuisine_type && formik.errors.cuisine_type}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="opening_hours"
                name="opening_hours"
                label="Opening Hours"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.opening_hours}
                error={formik.touched.opening_hours && Boolean(formik.errors.opening_hours)}
                helperText={formik.touched.opening_hours && formik.errors.opening_hours}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="streetAddress"
                name="streetAddress"
                label="Street Address"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.streetAddress}
                error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
                helperText={formik.touched.streetAddress && formik.errors.streetAddress}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                id="state"
                name="state"
                label="State/Province"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.state}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                id="postal_code"
                name="postal_code"
                label="Postal Code"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postal_code}
                error={formik.touched.postal_code && Boolean(formik.errors.postal_code)}
                helperText={formik.touched.postal_code && formik.errors.postal_code}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="country"
                name="country"
                label="Country"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="mobile"
                name="mobile"
                label="Mobile"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="twitter"
                name="twitter"
                label="Twitter URL"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.twitter}
                error={formik.touched.twitter && Boolean(formik.errors.twitter)}
                helperText={formik.touched.twitter && formik.errors.twitter}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                label="Instagram URL"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.instagram}
                error={formik.touched.instagram && Boolean(formik.errors.instagram)}
                helperText={formik.touched.instagram && formik.errors.instagram}
              />
            </Grid>
          </Grid>

          <Button 
            variant="contained" 
            color="primary" 
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className="mt-4"
          >
            Create Restaurant
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurantForm;