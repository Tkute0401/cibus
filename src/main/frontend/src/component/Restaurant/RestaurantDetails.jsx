import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LocationOnTwoToneIcon from '@mui/icons-material/LocationOnTwoTone';
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantCategories } from '../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../State/Menu/Action';

const foodTypes = [
    {label:"All",value:"all"},
    {label:"Veg-Only",value:"vegeterian"},
    {label:"Non-Veg",value:"non-veg"},
    {label:"Seasonal",value:"seasonal"}
]
const menu = [1,1,1,1,1,1]

const RestaurantDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {auth , restaurant , menu} = useSelector(Store=>Store );
    const [selectedCategory , setSelectedCategory] = useState("");

  const jwt = localStorage.getItem("jwt");
  console.log("restaurant",restaurant);
  console.log("menuItems",menu.menuItems);
  //const menuItem = JSON.parse(menu.menuItems);
    
    const {id} = useParams();
    const [foodtype,setFoodType] = useState("all")

    const handleFilter=(e)=>{
        setFoodType(e.target.value);
    }

    const handleFilterCategory=(e, value)=>{
        setSelectedCategory(value);
        console.clear();
        console.log(e.target.value,e.target.name,value);
        
    }
    console.log("selectedCategory of wqpd",jwt);
    useEffect(()=>{

        dispatch(getRestaurantById({jwt:auth.jwt || jwt, restaurantId:id}));
        dispatch(getRestaurantCategories(auth.jwt || jwt,id));
    },[])

    useEffect(()=>{
        dispatch(getMenuItemsByRestaurantId({
            jwt,
            restaurantId:id,
            vegeterian:foodtype==="vegeterian",
            nonveg:foodtype==="non-veg",
            seasonal:foodtype==="seasonal",
            
            foodCategory:selectedCategory}));
    },[selectedCategory,foodtype])


    
    const [category,setCatagory] = useState("All")
    return (
        <div className='px-5 lg:px-20'>
            <section>
                <h3 className='text-gray-500 py-2 mt-10'>Home/India/{restaurant.restaurant?.name}/</h3>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images[0]} alt="" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images[1]} alt="" />
                        </Grid>
                    </Grid>
                </div>
                <div className='pt-3 pb-5 '>
                    <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
                    <p className='text-gray-500 mt-1'>
                        <span>
                            {restaurant.restaurant?.description}
                        </span>
                    </p>

                    <div className='space-y-3 mt-3'>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <LocationOnTwoToneIcon />
                            <span>
                                Mumbai, Maharashtra
                            </span>
                        </p>
                        <p className='text-gray-500 flex items-center gap-3'>
                            <DateRangeTwoToneIcon />
                            <span>Mon-Sun: 9.00 AM - 9.00 PM (Today)
                            </span>
                        </p>
                    </div>
                </div>
            </section>
            <Divider />
            <section className='pt-[2rem] lg:flex relative'>
                <div className='space-y-10 lg:w-[20%] filter '>
                    <div className='box space-y-5 lg:sticky top-28 '>
                        <div>
                            <Typography variant="h5" sx={{paddingBottom:"1rem"}}>
                                Food Type
                            </Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilter} name='FoodType' value={foodtype}>
                                    {foodTypes.map((item)=>
                                    <FormControlLabel key={item.value} 
                                    value={item.value} 
                                    control={<Radio />} 
                                    label={item.label}
                                    />)}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider/>
                        <div>
                            <Typography variant="h5" sx={{paddingBottom:"1rem"}}>
                                Food Category
                            </Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup 
                                onChange={handleFilterCategory} 
                                name='FoodCatagory' 
                                value={selectedCategory}>
                                    <FormControlLabel value="" control={<Radio />} label="All" />
                                    {restaurant.categories.map((item)=>
                                    <FormControlLabel 
                                    key={item.id} 
                                    value={item.name} 
                                    control={<Radio />} 
                                    label={item.name} />)}
                                    {console.log("categories",restaurant.categories)}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>

                <div className='space-y-5 lg:w-[80%] lg:pl-10'>
                    {console.log("menu",menu)}
                    {menu.menuItems.map((item)=><MenuCard item={item} />)}
                </div>

            </section>
        </div>
    )
}

export default RestaurantDetails