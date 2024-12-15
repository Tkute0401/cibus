import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientsCategory,
  getIngredientsOfRestaurant,
} from "../../component/State/Ingredients/Action";
import { getRestaurantCategories } from "../../component/State/Restaurant/Action";
import AdminNavbar from "./AdminNavbar";
import { getUsersOrders } from "../../component/State/Order/Action";
import { fetchRestaurantOrders } from "../../component/State/RestaurantOrder/Action";
import RestaurantDashboard from "../Dashboard/RestaurantDashboard";
import RestaurantsOrder from "../Orders/RestaurantsOrder";
import RestaurantsMenu from "../Food/RestaurantsMenu";
import AddMenuForm from "../Food/AddMenuForm";
import CreateRestaurantForm from "../CreateRestaurantForm/CreateRestaurantForm";
import Ingredients from "../Ingredients/Ingredients";
import Events from "../Events/Events";
import Category from "../Category/Category";
import Details from "../Details/Details";

const Admin = () => {
  const dispatch = useDispatch();
  const [openSideBar, setOpenSideBar] = useState(false);
  const handleOpenSideBar = () => setOpenSideBar(true);
  const handleCloseSideBar = () => setOpenSideBar(false);
  const { auth, restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (restaurant.usersRestaurant) {
      dispatch(
        getIngredientsCategory({ jwt, id: restaurant.usersRestaurant?.id })
      );
      dispatch(
        getIngredientsOfRestaurant({ jwt, id: restaurant.usersRestaurant?.id })
      );
      dispatch(
        getRestaurantCategories({
          jwt: auth.jwt || jwt,
          restaurantId: restaurant.usersRestaurant?.id,
        })
      );

      dispatch(
        fetchRestaurantOrders({
          restaurantId: restaurant.usersRestaurant?.id,
          jwt: auth.jwt || jwt,
        })
      );
    }
  }, [restaurant.usersRestaurant]);
  return (
    <div>
      <AdminNavbar handleOpenSideBar={handleOpenSideBar} />
      <div className="lg:flex justify-between">
        <div className="">
          <AdminSidebar handleClose={handleCloseSideBar} open={openSideBar} />
        </div>
        <div className="lg:w-[80vw]">
          <Routes>
            <Route path="/:id" element={<RestaurantDashboard />} />
            <Route path="/orders" element={<RestaurantsOrder />} />
            <Route path="/menu" element={<RestaurantsMenu />} />
            <Route path="/add-menu" element={<AddMenuForm />} />
            <Route path="/add-restaurant" element={<CreateRestaurantForm />} />
            <Route path="/event" element={<Events />} />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/category" element={<Category />} />
            <Route path="/details" element={<Details />} />
          </Routes>
        </div>
      </div>
    </div>
    
  );
};

export default Admin;
