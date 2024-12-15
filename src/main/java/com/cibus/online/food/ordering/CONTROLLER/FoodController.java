package com.cibus.online.food.ordering.CONTROLLER;

import com.cibus.online.food.ordering.Model.Food;
import com.cibus.online.food.ordering.Model.Restaurant;
import com.cibus.online.food.ordering.Model.User;
import com.cibus.online.food.ordering.request.CreateFoodRequest;
import com.cibus.online.food.ordering.ressponse.MessageResponse;
import com.cibus.online.food.ordering.service.FoodService;
import com.cibus.online.food.ordering.service.RestaurantService;
import com.cibus.online.food.ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/food")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String name, @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);
        List<Food> foods = foodService.searchFood(name);

        return new ResponseEntity<>(foods ,HttpStatus.OK);
    }
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Food>> getRestaurantFood(
            @RequestParam(required = false) Boolean vegeterian,
            @RequestParam(required = false) Boolean nonVeg,
            @RequestParam(required = false) Boolean seasonal,
            @RequestParam(required = false) String food_category,
            @PathVariable long restaurantId,
            @RequestHeader("Authorization") String jwt) throws Exception {

        List<Food> foods = foodService.getRestaurantsFood(restaurantId,vegeterian,nonVeg,seasonal,food_category);
        return ResponseEntity.ok(foods);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Food> getFoodById(@PathVariable long id,
                                           @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Food food = foodService.getFoodById(id);
        return new ResponseEntity<>(food, HttpStatus.OK);
    }



}


























