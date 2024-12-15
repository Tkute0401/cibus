package com.cibus.online.food.ordering.request;

import com.cibus.online.food.ordering.Model.Category;
import com.cibus.online.food.ordering.Model.IngredientsItems;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class CreateFoodRequest {



    private String name;
    private String description;
    private Long price;


    private Category category;
    private List<String> images;


    private Long restaurantId;

    private boolean vegetarian;
    private boolean seasonal;


    private List<IngredientsItems> ingredients;


}
