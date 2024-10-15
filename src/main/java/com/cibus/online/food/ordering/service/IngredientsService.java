package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.IngredientsCategory;
import com.cibus.online.food.ordering.Model.IngredientsItems;

import java.util.List;

public interface IngredientsService {

    public IngredientsCategory createIngredientCategory(String name, Long restaurantId)throws  Exception;

    public IngredientsCategory findIngredientCategoryById(Long id)throws Exception;

    public List<IngredientsCategory> findIngredientCategoryByRestaurantId(Long id)throws Exception;

    public List<IngredientsItems> findRestaurantsIngredients(Long restaurantId)throws Exception;

     public IngredientsItems createIngredientItem(Long restaurantId,String ingredientName , Long categoryId)throws Exception;

     public IngredientsItems updateStock(Long id)throws Exception;

}
















