import { Divider, Drawer, Icon, useMediaQuery } from '@mui/material'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../State/Authentication/Action';

const menu=[
    {title:"orders",Icon:<ShoppingBagIcon/> },
    {title:"Favorites",Icon:<FavoriteIcon/> },
    {title:"Address",Icon:<LocationOnIcon/> },
    //{title:"Payment",Icon:<AccountBalanceWalletIcon/> },
   // {title:"Notifications",Icon:<NotificationsIcon/> },
    {title:"Event",Icon:<EventIcon/> },
    {title:"LogOut",Icon:<LogoutIcon/> },
]
const ProfileNavigation = ({open,handleClose}) => {
    const isSmallScreen=useMediaQuery("(max-width:900px)")
    const navigate = useNavigate();
    const dispach = useDispatch();
    const handleNavigate=(item)=>{
        if(item.title==="LogOut"){
            dispach(logOut());
            navigate("/")
        }
        else{
            navigate(`/my-profile/${item.title.toLowerCase()}`)
        }
    }
    return (
    <div className=''>
        <Drawer 
            variant={"permanent"} 
            onClose={handleClose} 
            // open={isSmallScreen? open:true} 
            open={true}
            anchor='left' 
            sx={{zIndex:-1,position:"sticky"}}
        >
            <div className='w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8 pt-16'>
                {menu.map((item,i)=><>
                    <div onClick={()=>handleNavigate(item)} className='px-5 flex items-center space-x-5 cursor-pointer'>
                        {item.Icon}
                        <span>
                            {item.title}
                        </span>
                    </div>
                {i!==menu.length-1 && <Divider/>}
                </>)}
            </div>
        </Drawer>
    </div>
  )
}

export default ProfileNavigation