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

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {
    @Autowired
    private FoodService foodService;
    @Autowired
    private UserService userService;
    @Autowired
    private RestaurantService restaurantService;
    @PostMapping()
    public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Restaurant restaurant = restaurantService.getRestaurantById(req.getRestaurantId());
        Food food = foodService.createFood(req,req.getCategory(),restaurant);
        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }
    @PostMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteFood(@PathVariable long id, @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        foodService.deleteFood(id);
        MessageResponse res = new MessageResponse();
        res.setMessage("Food Deleted");
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFoodAvailability(@RequestBody CreateFoodRequest req, @RequestHeader("Authorization") String jwt, @PathVariable long id) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Food food = foodService.updateAvailabilityStatus(id);
        return new ResponseEntity<>(food, HttpStatus.OK);
    }
}
