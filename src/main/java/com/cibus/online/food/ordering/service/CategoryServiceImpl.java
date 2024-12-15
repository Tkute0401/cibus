package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.Category;
import com.cibus.online.food.ordering.Model.Restaurant;
import com.cibus.online.food.ordering.Repository.CAtegoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategorySerice{

    @Autowired
    private RestaurantService restaurantService;

    @Autowired
    private CAtegoryRepository cAtegoryRepository;

    @Override
    public Category createCategory(String name, Long userId) throws Exception {
        Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);
        Category category = new Category();
        category.setName(name);
        category.setRestaurant(restaurant);

        return cAtegoryRepository.save(category);
    }

    @Override
    public List<Category> findCategoryByRestaurantId(Long id) throws Exception {
        Restaurant restaurant =restaurantService.getRestaurantById(id);
        return cAtegoryRepository.findByRestaurantId(restaurant.getId());
    }

    @Override
    public Category findCategoryById(Long id) throws Exception {
        Optional<Category> optionalCategory = cAtegoryRepository.findById(id);
        if(optionalCategory.isEmpty()){
            throw new Exception("category not found");
        }
        return optionalCategory.get();
    }
}





































