package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public User findUserByJwtToken(String jwt) throws Exception;

    public User findUserByEmail(String email) throws Exception;



}
