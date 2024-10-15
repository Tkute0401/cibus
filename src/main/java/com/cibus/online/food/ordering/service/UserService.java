package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.User;

public interface UserService {
    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;



}
