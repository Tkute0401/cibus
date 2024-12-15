import { AdminPanelSettings, Category, Dashboard, Event, Fastfood, Logout, Shop2, ShoppingBag } from '@mui/icons-material'
import { Divider, Drawer, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../component/State/Store'
import { logOut } from '../../component/State/Authentication/Action'
import { getRestaurantByUserId, getRestaurantCategories } from '../../component/State/Restaurant/Action'
const menu=[
  {title :"dashBoard",icon:<Dashboard/>,path:"/"},
  {title :"Orders",icon:<ShoppingBag/>,path:"/orders"},
  {title :"Menu",icon:<Shop2/>,path:"/menu"},
  {title :"Food Category",icon:<Category/>,path:"/category"},
  {title :"Ingredients",icon:<Fastfood/>,path:"/ingredients"},
  {title :"Event",icon:<Event/>,path:"/event"},
  {title :"Details",icon:<AdminPanelSettings/>,path:"/details"},
  {title :"LogOut",icon:<Logout/>,path:"/"}
  ]

const AdminSideBar = ({handleClose}) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {restaurant} = useSelector(Store=>Store)
  useEffect(()=>{
    //dispatch(getRestaurantByUserId(localStorage.getItem("jwt")));
    dispatch(getRestaurantCategories(localStorage.getItem("jwt"),restaurant.restaurant?.id));
  },[]);
  const handleNavigate = (item) => {
    navigate(`/admin/restaurant${item.path}`);
    if (item.title === "LogOut") {
      console.log("logout1");
      dispatch(logOut());
      navigate("/");
      
    } else if (item.title === "Restaurants") {
      navigate("/admin");
    }else if(item.title==="dashBoard"){
      navigate(`/admin/restaurant/${restaurant.userRestaurants.id}`);
    }
    handleClose()
  };

  const isSmallScreen=useMediaQuery("(max-width:1080px)");
  return (
    <div className=" ">
      <React.Fragment>
        <Drawer
          sx={{ zIndex: 1 }}
          anchor={"left"}
          open={true}
          onClose={handleClose}
          className='mt-10'
          variant={isSmallScreen ? "temporary" : "permanent"}
          // variant="persistent"
        >
          <div className="w-[70vw] lg:w-[20vw] group h-[100vh] flex flex-col justify-center text-xl space-y-[1.65rem]">
            
            {menu.map((item, i) => (
              <>
                <div
                  onClick={() => handleNavigate(item)}
                  className="px-5 flex items-center space-x-5 cursor-pointer"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
               {i!==menu.length-1 && <Divider />}
              </>
            ))}
          </div>

        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default AdminSideBar