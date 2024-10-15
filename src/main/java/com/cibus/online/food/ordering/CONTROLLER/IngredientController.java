package com.cibus.online.food.ordering.CONTROLLER;

import com.cibus.online.food.ordering.Model.IngredientsCategory;
import com.cibus.online.food.ordering.Model.IngredientsItems;
import com.cibus.online.food.ordering.request.IngredientCategoryRequest;
import com.cibus.online.food.ordering.request.IngredientItemRequest;
import com.cibus.online.food.ordering.service.IngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientController {
    @Autowired
    private IngredientsService ingredientsService;
    @PostMapping("/category")
    public ResponseEntity<IngredientsCategory> createIngredientCAtegory(@RequestBody IngredientCategoryRequest req) throws Exception {
        IngredientsCategory item = ingredientsService.createIngredientCategory(req.getName(),req.getRestaurantId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }
    @PostMapping()
    public ResponseEntity<IngredientsItems> createIngredientitem(@RequestBody IngredientItemRequest req) throws Exception {
        IngredientsItems item = ingredientsService.createIngredientItem(req.getRestaurantId(), req.getName(), req.getCategoryId());
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }
    @PutMapping("/{id}/stock")
    public ResponseEntity<IngredientsItems> updateIngredientStock(@PathVariable Long id) throws Exception {
        IngredientsItems item = ingredientsService.updateStock(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }
    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<IngredientsItems>> getRestaurantIngredients(@PathVariable Long id) throws Exception {
        List<IngredientsItems> items = ingredientsService.findRestaurantsIngredients(id);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }
    @GetMapping("/restaurant/{id}/category")
    public ResponseEntity<List<IngredientsCategory>> getRestaurantIngredientsCategorty(@PathVariable Long id) throws Exception {
        List<IngredientsCategory> categories = ingredientsService.findIngredientCategoryByRestaurantId(id);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
}