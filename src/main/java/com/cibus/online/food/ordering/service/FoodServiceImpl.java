package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.Category;
import com.cibus.online.food.ordering.Model.Food;
import com.cibus.online.food.ordering.Model.Restaurant;
import com.cibus.online.food.ordering.Repository.FoodRepository;
import com.cibus.online.food.ordering.request.CreateFoodRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FoodServiceImpl implements FoodService {
    @Autowired
    private FoodRepository foodRepository;

    @Override
    public Food createFood(CreateFoodRequest req, Category category, Restaurant restaurant) {
        Food food = new Food();
        food.setFoodCategory(category);
        food.setRestaurant(restaurant);
        food.setDescription(req.getDescription());
        food.setName(req.getName());
        food.setPrice(req.getPrice());
        food.setIngredients(req.getIngredients());
        food.setSeasonal(req.getSeasonal());
        food.setVegitarian(req.getVegetarian());

        Food saveFood = foodRepository.save(food);
        restaurant.getFoods().add(saveFood);

        return saveFood;
    }

    @Override
    public void deleteFood(long foodId) throws Exception {

        Food food = new Food();
        food.setRestaurant(null);
        foodRepository.save(food);

    }
    @Override
    public List<Food> getRestaurantsFood(Long restaurantId, Boolean isVegetarian, boolean isNonVegetarian, Boolean isSeasonal, String foodCategory) {

        Food food = new Food();
        List<Food> foods = foodRepository.findByRestaurantId(restaurantId);

        if(isVegetarian){
            foods= filterByvegeterian(foods,isVegetarian);
        }
        if(isNonVegetarian){
            foods= filterByNonvegeterian(foods,isNonVegetarian);
        }
        if(isSeasonal){
            foods = filterBySeasonal(foods,isSeasonal);
        }
        if(foodCategory!=null && !foodCategory.equals("")){
            foods = filterByCategory(foods , foodCategory);
        }
        return foods;
    }
    private List<Food> filterByCategory(List<Food> foods, String foodCategory) {
        return foods.stream().filter(food -> {if(food.getFoodCategory()!= null){
            food.getFoodCategory().getName().equals(foodCategory);
        }
        return false;
        }).collect(Collectors.toList());
    }
    private List<Food> filterBySeasonal(List<Food> foods, Boolean isSeasonal) {
        return foods.stream().filter(food -> food.isSeasonal() == isSeasonal).collect(Collectors.toList());
    }
    private List<Food> filterByNonvegeterian(List<Food> foods, boolean isNonVegetarian) {
        return foods.stream().filter(food -> food.isVegitarian() == false).collect(Collectors.toList());
    }
    private List<Food> filterByvegeterian(List<Food> foods, Boolean isVegetarian) {

        return foods.stream().filter(food -> food.isVegitarian() == isVegetarian).collect(Collectors.toList());

    }
    @Override
    public List<Food> searchFood(String keyword) {
        return foodRepository.searchByFood(keyword);
    }
    @Override
    public Food getFoodById(long foodId) throws Exception {
        Optional<Food> optionalFood = foodRepository.findById(foodId);
        if(optionalFood.isEmpty()){
            throw new Exception("food not found with id " + foodId);
        }
        return optionalFood.get();
    }
    @Override
    public Food updateAvailabilityStatus(long foodId) throws Exception {
        Food food = getFoodById(foodId);
        food.setAvailable(!food.isAvailable());
        return foodRepository.save(food);
    }
}
