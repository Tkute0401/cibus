package com.cibus.online.food.ordering.request;

import jakarta.persistence.Table;
import lombok.Data;


@Data
public class IngredientItemRequest {
    private String name;
    private Long categoryId;
    private Long restaurantId;
}
