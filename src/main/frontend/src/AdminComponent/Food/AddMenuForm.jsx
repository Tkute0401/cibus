import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  OutlinedInput,
  Snackbar,
  FormHelperText
} from "@mui/material";
import { uploadToCloudinary } from "../../component/Util/UploadToCloudnary";
import { createMenuItems } from "../../component/State/Menu/Action";
import { getRestaurantCategories } from "../../component/State/Restaurant/Action";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .matches(/^[a-zA-Z0-9\s&-]+$/, "Name can only contain letters, numbers, spaces, &, and -"),
  
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
  
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .min(0, "Price must be greater than or equal to 0")
    .max(10000, "Price cannot exceed 10000"),

  images: Yup.array()
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed"),
  
  category: Yup.object()
    .nullable()
    .required("Category is required"),
  
  vegetarian: Yup.boolean().required("Vegetarian status is required"),
  
  seasonal: Yup.boolean().required("Seasonal status is required"),
  
  ingredients: Yup.array()
    .max(20, "Maximum 20 ingredients allowed"),
  
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .min(0, "Quantity must be greater than or equal to 0")
    .max(1000, "Quantity cannot exceed 1000")
    .integer("Quantity must be a whole number")
});

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  images: [],
  restaurantId: "",
  vegetarian: true,
  seasonal: false,
  quantity: 0,
  ingredients: [],
};

const AddMenuForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { restaurant, ingredients, auth, menu } = useSelector((store) => store);
  const [uploadImage, setUploadingImage] = useState("");
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      values.restaurantId = restaurant.restaurant.id;
      dispatch(createMenuItems(values, auth.jwt || jwt));
      navigate("/admin/restaurant/menu");
    },
  });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadingImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    dispatch(getRestaurantCategories(jwt, restaurant.restaurant.id));
    if (menu.message || menu.error) setOpenSnackBar(true);
  }, [menu.message, menu.error]);

  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <>
      <div className="lg:px-32 px-5 lg:flex justify-center min-h-screen items-center pb-5">
        <div>
          <h1 className="font-bold text-2xl text-center py-2">
            Add New Menu Item
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
                        alt={`ProductImage ${index + 1}`}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="price"
                  name="price"
                  label="Price"
                  variant="outlined"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl 
                  fullWidth 
                  variant="outlined"
                  error={formik.touched.category && Boolean(formik.errors.category)}
                >
                  <InputLabel htmlFor="categoryId">Food Category</InputLabel>
                  <Select
                    id="category"
                    name="category"
                    label="Food Category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                  >
                    {restaurant.categories.map((item) => (
                      <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
                    ))}
                  </Select>
                  {formik.touched.category && formik.errors.category && (
                    <FormHelperText>{formik.errors.category}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl 
                  fullWidth
                  error={formik.touched.ingredients && Boolean(formik.errors.ingredients)}
                >
                  <InputLabel id="ingredient-multiple-chip-label">
                    Ingredients
                  </InputLabel>
                  <Select
                    labelId="ingredient-multiple-chip-label"
                    id="ingredient-multiple-chip"
                    multiple
                    name="ingredients"
                    value={formik.values.ingredients}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Ingredients"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value.id} label={value.name} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {ingredients.ingredients?.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.ingredients && formik.errors.ingredients && (
                    <FormHelperText>{formik.errors.ingredients}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl 
                  fullWidth 
                  variant="outlined"
                  error={formik.touched.vegetarian && Boolean(formik.errors.vegetarian)}
                >
                  <InputLabel htmlFor="vegetarian">Is Vegetarian</InputLabel>
                  <Select
                    id="vegetarian"
                    name="vegetarian"
                    label="Is Vegetarian"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.vegetarian}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                  {formik.touched.vegetarian && formik.errors.vegetarian && (
                    <FormHelperText>{formik.errors.vegetarian}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl 
                  fullWidth 
                  variant="outlined"
                  error={formik.touched.seasonal && Boolean(formik.errors.seasonal)}
                >
                  <InputLabel htmlFor="seasonal">Is Seasonal</InputLabel>
                  <Select
                    id="seasonal"
                    name="seasonal"
                    label="Is Seasonal"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.seasonal}
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                  </Select>
                  {formik.touched.seasonal && formik.errors.seasonal && (
                    <FormHelperText>{formik.errors.seasonal}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Create Menu Item
            </Button>
          </form>
        </div>
      </div>

      <Snackbar
        sx={{ zIndex: 50 }}
        open={openSnackBar}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={menu.error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {menu.message || auth.error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddMenuForm;