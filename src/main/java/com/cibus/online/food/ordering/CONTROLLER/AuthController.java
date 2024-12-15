package com.cibus.online.food.ordering.CONTROLLER;

import com.cibus.online.food.ordering.Model.Cart;
import com.cibus.online.food.ordering.Model.USER_ROLE;
import com.cibus.online.food.ordering.Model.User;
import com.cibus.online.food.ordering.Repository.CartRepository;
import com.cibus.online.food.ordering.Repository.UserRepository;
import com.cibus.online.food.ordering.config.JwtProvider;
import com.cibus.online.food.ordering.request.LoginRequest;
import com.cibus.online.food.ordering.ressponse.AuthResponse;
import com.cibus.online.food.ordering.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RequestMapping("/auth")
@RestController
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse>createUserHandler(@RequestBody User user) throws Exception {

        User isEmailExist= userRepository.findByEmail(user.getEmail());
        if(isEmailExist != null)
            throw new Exception("Email is associated with another account");
        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setName(user.getName());
        createdUser.setRole(user.getRole());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        User savedUser = userRepository.save(createdUser);

        Cart cart = new Cart();
        cart.setCustomer(savedUser);
        cartRepository.save(cart);

        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        
        authResponse.setMessage("Registeration successful");
        authResponse.setRole(savedUser.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest req) {

        String username = req.getEmail();
        String password = req.getPassword();

        Authentication authentication = authentication(username, password);
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String role = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();
        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("login successful");
        authResponse.setRole(USER_ROLE.valueOf(role));


        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    private Authentication authentication(String username, String password) {

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        if(userDetails==null)
            throw new BadCredentialsException("invalid username");

        if(!passwordEncoder.matches(password,userDetails.getPassword()))
            throw new BadCredentialsException("incorrect Password......");
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());


    }

}


















