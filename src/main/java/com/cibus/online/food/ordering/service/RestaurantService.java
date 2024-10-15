package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.Restaurant;
import com.cibus.online.food.ordering.Model.User;
import com.cibus.online.food.ordering.dto.RestaurantDto;
import com.cibus.online.food.ordering.request.CreateRestaurantRequest;

import java.util.List;

public interface RestaurantService {
    public Restaurant crateRestaurant(CreateRestaurantRequest req , User user);

    public Restaurant updateRestaurant(long restaurantId, CreateRestaurantRequest updateRestaurant)throws Exception;

    public void deleteRestaurant(long restaurantId)throws Exception;

    public List<Restaurant> getAllRestaurants();

    public List<Restaurant> searchRestaurant(String keyword);

    public Restaurant getRestaurantById(long restaurantId)throws Exception;


    public Restaurant getRestaurantByUserId(long userId)throws Exception;

    public RestaurantDto addToFavourite(long restaurantId, User user)throws Exception;

    public Restaurant updateRestaurantStatus(long id) throws Exception;


}
