import React, { useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CarouselItem from './CarouselItem';
import topMeal from "./topMeal";
import { useDispatch, useSelector } from 'react-redux';
import { searchMenuItem } from '../State/Menu/Action';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
const MultiItemCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay:true,
    autoplayspeed:2000,
    arrows:false,
    loop:true

  };
  const dispatch = useDispatch();
  const { menu, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  return (
    <div>
        <Slider  {...settings}>
            {topMeal.map((item)=><CarouselItem image={item.image} title={item.title} />)}
        </Slider>
    </div>
  )
};

export default MultiItemCarousel