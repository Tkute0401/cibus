package com.cibus.online.food.ordering.dto;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Embeddable
public class RestaurantDto {

    private String title;

    @Column(length = 1000)
    private List<String> images = new ArrayList<>();

    private String description;
    private long id;


}
