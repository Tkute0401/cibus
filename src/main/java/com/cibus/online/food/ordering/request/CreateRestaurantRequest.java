package com.cibus.online.food.ordering.request;

import com.cibus.online.food.ordering.Model.Address;
import com.cibus.online.food.ordering.Model.ContactInfo;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CreateRestaurantRequest {

    private long id;
    private String name;
    private Address address;
    private String description;
    private String cuisine_type;
    private ContactInfo contactInformation;
    private String openingHours;
    private List<String> images;
}
