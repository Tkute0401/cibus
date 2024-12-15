package com.cibus.online.food.ordering.CONTROLLER;

import com.cibus.online.food.ordering.Model.Category;
import com.cibus.online.food.ordering.Model.Restaurant;
import com.cibus.online.food.ordering.Model.User;
import com.cibus.online.food.ordering.service.CategorySerice;
import com.cibus.online.food.ordering.service.RestaurantService;
import com.cibus.online.food.ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategorySerice categorySerice;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping("/admin/category")
    public ResponseEntity<Category> createCategory(@RequestBody Category category,
                                                   @RequestHeader("Authorization") String jwt)throws Exception{
        User user = userService.findUserByJwtToken(jwt);

        Category createdCategory = categorySerice.createCategory(category.getName(),user.getId());

        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);


    }
    @GetMapping("/category/restaurant/{id}")
    public ResponseEntity<List<Category>> getRestaurantCategory(@PathVariable Long id,
            @RequestHeader("Authorization") String jwt)throws Exception{
        List<Category> categories = categorySerice.findCategoryByRestaurantId(id);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}
































