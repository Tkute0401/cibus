import React, { useEffect } from "react";
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar'
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import { Badge } from "@mui/material";
import "./NavBar.css";
import { pink } from "@mui/material/colors";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantByUserId } from "../State/Restaurant/Action";

export const NavBar = () => {
    const {auth,cart,restaurant} = useSelector(Store => Store);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const jwt = localStorage.getItem("jwt");

    const handleAvatarClick = () => {
        if(auth.user?.role==="ROLE_CUSTOMER"){
            navigate("/my-profile")
        }else{
            navigate(`/admin/restaurant/${restaurant.userRestaurants.id}`)
        }
    }
    return(
        <div className="px-5 z-50 sticky top-0 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between">
            <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
                <li onClick={() => navigate("/")} className="logo font-semibold text-gray-300 text-2xl">
                    Cibus
                </li>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-10">
                <div className="">
                    <IconButton onClick={() => navigate("/search")}>
                      <SearchIcon sx={{fontSize:"1.5rem"}}/>
                    </IconButton>
                </div>
                <div className="">
                    {auth.user?(
                    <Avatar onClick={handleAvatarClick} sx={{ bgcolor:"white",color:pink.A400 }} >{auth.user.name[0].toUpperCase()} 
                    </Avatar>): (<IconButton onClick={()=> navigate("/account/login")}>
                            <Person/>
                        </IconButton>)}
                </div>
                <div className="">
                    <IconButton onClick={()=> navigate("/cart")}>
                        <Badge color="secondary" badgeContent={cart.cart?.items.length}>
                            <ShoppingCartTwoToneIcon />
                        </Badge>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};