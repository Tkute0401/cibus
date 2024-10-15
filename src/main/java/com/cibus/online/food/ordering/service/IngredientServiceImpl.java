package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.IngredientsCategory;
import com.cibus.online.food.ordering.Model.IngredientsItems;
import com.cibus.online.food.ordering.Model.Restaurant;
import com.cibus.online.food.ordering.Repository.IngredientCategoryRepository;
import com.cibus.online.food.ordering.Repository.IngredientItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientServiceImpl implements IngredientsService{

    @Autowired
    private IngredientItemRepository ingredientItemRepository;
    @Autowired
    private IngredientCategoryRepository ingredientCategoryRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public IngredientsCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
        IngredientsCategory category = new IngredientsCategory();

        category.setRestaurant(restaurant);
        category.setName(name);
        return ingredientCategoryRepository.save(category);
    }

    @Override
    public IngredientsCategory findIngredientCategoryById(Long id) throws Exception {

        Optional<IngredientsCategory> opt = ingredientCategoryRepository.findById(id);

        if(opt.isEmpty())
        {
            throw new Exception("category not found");
        }
        return opt.get();
    }

    @Override
    public List<IngredientsCategory> findIngredientCategoryByRestaurantId(Long id) throws Exception {
        restaurantService.getRestaurantById(id);
        return ingredientCategoryRepository.findByRestaurantId(id);
    }

    @Override
    public List<IngredientsItems> findRestaurantsIngredients(Long restaurantId) throws Exception {
        return ingredientItemRepository.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItems createIngredientItem(Long restaurantId, String ingredientName, Long categoryId) throws Exception {
        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
        IngredientsCategory category = findIngredientCategoryById(categoryId);

        IngredientsItems item = new IngredientsItems();
        item.setName(ingredientName);
        item.setRestaurant(restaurant);
        item.setCategory(category);

        IngredientsItems ingredient = ingredientItemRepository.save(item);
        category.getIngredientsItems().add(ingredient);

        return ingredient;
    }

    @Override
    public IngredientsItems updateStock(Long id) throws Exception {
        Optional<IngredientsItems> optionalIngredientsItems  = ingredientItemRepository.findById(id);
        if(optionalIngredientsItems.isEmpty()){
            throw new Exception("ingredient not found");
        }
        IngredientsItems ingredientsItems =  optionalIngredientsItems.get();
        ingredientsItems.setInStock(!ingredientsItems.isInStock());
        return ingredientItemRepository.save(ingredientsItems);
    }

}