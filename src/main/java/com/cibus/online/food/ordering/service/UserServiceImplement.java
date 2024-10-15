package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.User;
import com.cibus.online.food.ordering.Repository.UserRepository;
import com.cibus.online.food.ordering.config.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplement implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;


    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        User user = userRepository.findByEmail(email);
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {

        User user = userRepository.findByEmail(email);
        if(user==null)
            throw new Exception("user not found by email"+email);
        return user;
    }
}