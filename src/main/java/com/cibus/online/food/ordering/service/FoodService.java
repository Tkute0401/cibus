package com.cibus.online.food.ordering.service;
import com.cibus.online.food.ordering.Model.Category;
import com.cibus.online.food.ordering.Model.Food;
import com.cibus.online.food.ordering.Model.Restaurant;
import com.cibus.online.food.ordering.request.CreateFoodRequest;

import java.util.List;
public interface FoodService {
    public Food createFood(CreateFoodRequest req , Category category , Restaurant restaurant);
    void deleteFood(long foodId) throws Exception;
    public List<Food> getRestaurantsFood(Long restaurantId, Boolean isVegetarian, boolean isNonVegetarian, Boolean isSeasonal,String foodCategory);
    public List<Food> searchFood(String keyword);
    public Food getFoodById(long foodId) throws Exception;
    public Food updateAvailabilityStatus(long foodId) throws Exception;
}































