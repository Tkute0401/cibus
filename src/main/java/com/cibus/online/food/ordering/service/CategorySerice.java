package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.Category;

import java.util.List;

public interface CategorySerice {

    public Category createCategory(String name,Long userId) throws Exception;

    public List<Category> findCategoryByRestaurantId(Long id) throws Exception;

    public Category findCategoryById(Long id) throws Exception;



}
