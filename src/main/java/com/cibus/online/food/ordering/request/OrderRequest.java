package com.cibus.online.food.ordering.request;

import com.cibus.online.food.ordering.Model.Address;
import lombok.Data;

@Data
public class OrderRequest {
    private Long restaurantId;
    private Address deliveryAddress;
}
