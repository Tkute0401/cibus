package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.Address;
import com.cibus.online.food.ordering.Model.Restaurant;
import com.cibus.online.food.ordering.Model.User;
import com.cibus.online.food.ordering.Repository.AddressRipository;
import com.cibus.online.food.ordering.Repository.RestaurantRepository;
import com.cibus.online.food.ordering.Repository.UserRepository;
import com.cibus.online.food.ordering.dto.RestaurantDto;
import com.cibus.online.food.ordering.request.CreateRestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantSeerviceImpl implements RestaurantService{

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private AddressRipository addressRipository;


    @Autowired
    UserRepository userRepository;



    @Override
    public Restaurant crateRestaurant(CreateRestaurantRequest req, User user) {

        Address address = addressRipository.save(req.getAddress());
        Restaurant restaurant = new Restaurant();
        restaurant.setAddress(address);
        restaurant.setContactInfo(req.getContactInformation());
        restaurant.setCuisineType(req.getCuisine_type());
        restaurant.setDescription(req.getDescription());
        restaurant.setImages(req.getImages());
        restaurant.setName(req.getName());
        restaurant.setOpeningHours(req.getOpeningHours());
        restaurant.setRegistrationDate(LocalDateTime.now());
        restaurant.setOwner(user);

        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurant updateRestaurant(long restaurantId, CreateRestaurantRequest updateRestaurant) throws Exception {

        Restaurant restaurant = getRestaurantById(restaurantId);

        if(restaurant.getCuisineType()!=null)
            restaurant.setCuisineType(updateRestaurant.getCuisine_type());
        if(restaurant.getDescription()!=null)
            restaurant.setDescription(updateRestaurant.getDescription());
        if(restaurant.getImages()!=null)
            restaurant.setImages(updateRestaurant.getImages());
        if(restaurant.getName()!=null)
            restaurant.setName(updateRestaurant.getName());
        if (restaurant.getOpeningHours()!=null)
            restaurant.setOpeningHours(updateRestaurant.getOpeningHours());
        if (restaurant.getContactInfo()!=null)
            restaurant.setContactInfo(updateRestaurant.getContactInformation());
        if (restaurant.getAddress()!=null)
            restaurant.setAddress(updateRestaurant.getAddress());
        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(long restaurantId) throws Exception {

        Restaurant restaurant = getRestaurantById(restaurantId);
        restaurantRepository.delete(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurants() {

        return restaurantRepository.findAll();
    }

    @Override
    public List<Restaurant> searchRestaurant(String keyword) {

        return restaurantRepository.findBySearchQuery(keyword);
    }

    @Override
    public Restaurant getRestaurantById(long restaurantId) throws Exception {
        Optional<Restaurant> opt = restaurantRepository.findById(restaurantId);
        if(opt.isEmpty())
            throw new Exception("Restaurant not found with id " + restaurantId);
        return opt.get();
    }

    @Override
    public Restaurant getRestaurantByUserId(long userId) throws Exception {

        Restaurant restaurant = restaurantRepository.findByOwnerId(userId);
        if(restaurant==null)
            throw new Exception("Restaurant not found with id " + userId);
        return restaurant;
    }

    @Override
    public RestaurantDto addToFavourite(long restaurantId, User user) throws Exception {
        Restaurant restaurant = getRestaurantById(restaurantId);
        RestaurantDto dto = new RestaurantDto();
        dto.setDescription(restaurant.getDescription());
        dto.setImages(restaurant.getImages());
        dto.setTitle(restaurant.getName());
        dto.setId(restaurant.getId());


        if(user.getFavourite().contains(dto))
            user.getFavourite().remove(dto);
        else user.getFavourite().add(dto);


        userRepository.save(user);
        return dto;
    }
    @Override
    public Restaurant updateRestaurantStatus(long id) throws Exception {
        Restaurant restaurant = getRestaurantById(id);
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);
    }
}
