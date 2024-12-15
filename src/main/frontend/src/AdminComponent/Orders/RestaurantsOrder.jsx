import React, { useEffect } from "react";
import OrdersTable from "./OrderTable";
import {
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantOrders } from "../../component/State/RestaurantOrder/Action";
import { Store } from "../../component/State/Store";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  // { label: "Out For Delivery", value: "OUT_FOR_DELIVERY" },
  // { label: "Delivered", value: "DELIVERED" },
  { label: "All", value: "all" },
];

const RestaurantsOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, auth, restaurantsOrder ,order } = useSelector((Store) => Store);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const filterValue = searchParams.get("order_status");
  console.log("filterValue===", filterValue);
  console.log("order===", order);
  console.log("restaurant===", restaurant);
  console.log("restaurant id",restaurant.userRestaurants.id);
  let status = filterValue ? filterValue : "all";
  useEffect(() => {
    console.log("use effect filterValue", status,"restaurantid",restaurant.restaurant?.id,"jwt",auth.jwt || jwt);
    dispatch(
      fetchRestaurantOrders(restaurant.restaurant?.id,status,auth.jwt || jwt)
      
    );
    console.log("after Status",status);
  }, [filterValue]);
  console.log("Orders===", restaurantsOrder.id);

  const handleFilter = (e, value) => {
    const searchParams = new URLSearchParams(location.search);

    if (value === "all") {
      searchParams.delete("order_status");
    } else searchParams.set("order_status", e.target.value);
    console.log("searchParams", e.target.value);

    const query = searchParams.toString();
    console.log("query", query);
    navigate(`${location.pathname}?${query}`, { replace: true });
  };
  
  return (
    <div className="px-2">
      <Card className="p-5">
        <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
          Order Status
        </Typography>
        <FormControl className="py-10" component="fieldset">
          <RadioGroup
            row
            name="category"
            value={filterValue ? filterValue : "all"}
            onChange={handleFilter}
          >
            {orderStatus.map((item, index) => (
              <FormControlLabel
                key={index}
                value={item.value}
                control={<Radio />}
                label={item.label}
                sx={{ color: "gray" }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>

      <OrdersTable name={"All Orders"} />
    </div>
  );
};

export default RestaurantsOrder;
