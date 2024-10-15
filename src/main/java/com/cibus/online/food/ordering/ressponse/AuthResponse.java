package com.cibus.online.food.ordering.ressponse;

import com.cibus.online.food.ordering.Model.USER_ROLE;
import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private String message;
    private USER_ROLE role;
}
