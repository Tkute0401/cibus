import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEvents,
  getRestaurantEvents,
} from "../../component/State/Restaurant/Action";
import EventCard from "./EventCard";
import * as Yup from 'yup';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: "",
  location: "",
  description: "",
  name: "",
  startedAt: null,
  endsAt: null,
};

const eventValidationSchema = Yup.object().shape({
  image: Yup.string()
    .url('Please enter a valid URL')
    .required('Event image is required'),
  
  location: Yup.string()
    .min(3, 'Location must be at least 3 characters')
    .max(100, 'Location cannot exceed 100 characters')
    .required('Location is required'),
  
  name: Yup.string()
    .min(3, 'Event name must be at least 3 characters')
    .max(50, 'Event name cannot exceed 50 characters')
    .required('Event name is required'),
  
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description cannot exceed 500 characters')
    .required('Event description is required')
});

const Events = () => {
  const dispatch = useDispatch();
  const { restaurant, auth } = useSelector((store) => store);
  const [openModal, setOpenModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const jwt = localStorage.getItem("jwt");

  const [formValues, setFormValues] = useState(initialValues);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    
    if (formErrors[name]) {
      const updatedErrors = { ...formErrors };
      delete updatedErrors[name];
      setFormErrors(updatedErrors);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await eventValidationSchema.validate(formValues, { abortEarly: false });

      dispatch(
        createEvents({
          data: formValues,
          restaurantId: restaurant.restaurant.id,
          jwt
        })
      );
      
      setFormValues(initialValues);
      setOpenModal(false);
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setFormErrors(errors);
      }
    }
  };

  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getRestaurantEvents({
          restaurantId: restaurant.usersRestaurant?.id,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [restaurant, dispatch, auth.jwt, jwt]);

  return (
    <div>
      <div className="p-5">
        <Button
          sx={{ padding: "1rem 2rem" }}
          onClick={() => setOpenModal(true)}
          variant="contained"
          color="primary"
        >
          Create New Event
        </Button>
      </div>

      <div className="mt-5 px-5 flex flex-wrap gap-5">
        {restaurant.restaurantEvents?.map((item) => (
          <EventCard key={item.id} item={item} />
        ))}
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="image"
                  label="Image URL"
                  variant="outlined"
                  fullWidth
                  value={formValues.image}
                  onChange={handleFormChange}
                  error={!!formErrors.image}
                  helperText={formErrors.image}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  value={formValues.location}
                  onChange={handleFormChange}
                  error={!!formErrors.location}
                  helperText={formErrors.location}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Event Name"
                  variant="outlined"
                  fullWidth
                  value={formValues.name}
                  onChange={handleFormChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={formValues.description}
                  onChange={handleFormChange}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                />
              </Grid>
            </Grid>
            <Box mt={2}>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Events;