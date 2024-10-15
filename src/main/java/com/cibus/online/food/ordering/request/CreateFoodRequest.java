package com.cibus.online.food.ordering.request;

import com.cibus.online.food.ordering.Model.Category;
import com.cibus.online.food.ordering.Model.IngredientsItems;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateFoodRequest {

    private String name;
    private String description;
    private long price;

    private Category category;
    private List<String> images;

    private long restaurantId;
    private Boolean vegetarian;
    private Boolean available;
    private Boolean seasonal;
    private List<IngredientsItems> ingredients;
}
