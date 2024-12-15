package com.cibus.online.food.ordering.request;

import jakarta.persistence.Table;
import lombok.Data;

@Data
@Table(name = "ingredient_category")
public class IngredientCategoryRequest {
    private String name;
    private Long restaurantId;


}
