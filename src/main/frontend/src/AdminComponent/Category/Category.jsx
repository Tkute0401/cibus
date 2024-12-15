// Category.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantCategories } from '../../component/State/Restaurant/Action';
import { 
  Box, 
  Card, 
  CardHeader, 
  IconButton, 
  Modal, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Alert,
  Snackbar 
} from '@mui/material';
import { Create } from '@mui/icons-material';
import CreateCategory from './CreateCategory';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: "none",
  p: 4,
  borderRadius: 1
};

const Category = () => {
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector(store => store);
  const jwt = localStorage.getItem("jwt");
  const [openCreateCategory, setOpenCreateCategory] = useState(false);
  const [error, setError] = useState(null);

  const handleOpenCreateCategory = () => setOpenCreateCategory(true);
  const handleCloseCreateCategory = () => {
    setOpenCreateCategory(false);
    setError(null);
  };

  useEffect(() => {
    if (restaurant?.restaurant?.id) {
      try {
        dispatch(getRestaurantCategories(jwt, restaurant.restaurant.id));
      } catch (err) {
        setError('Failed to fetch categories. Please try again.');
      }
    }
  }, [dispatch, jwt, restaurant.restaurant?.id]);

  return (
    <div>
      <Card className="mt-1">
        <CardHeader
          title="Categories"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
          action={
            <IconButton 
              onClick={handleOpenCreateCategory}
              title="Create new category"
            >
              <Create />
            </IconButton>
          }
        />
        <TableContainer>
          <Table aria-label="categories table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.categories.map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  sx={{
                    "&:last-of-type td, &:last-of-type th": { border: 0 },
                    cursor: "pointer"
                  }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                </TableRow>
              ))}
              {restaurant.categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No categories found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal
        open={openCreateCategory}
        onClose={handleCloseCreateCategory}
        aria-labelledby="create-category-modal"
        aria-describedby="modal-to-create-new-category"
      >
        <Box sx={style}>
          <CreateCategory handleClose={handleCloseCreateCategory} />
        </Box>
      </Modal>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Category;