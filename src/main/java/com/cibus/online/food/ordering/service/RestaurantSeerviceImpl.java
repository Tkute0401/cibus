package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.*;
import com.cibus.online.food.ordering.Repository.*;
import com.cibus.online.food.ordering.dto.RestaurantDto;
import com.cibus.online.food.ordering.request.CreateRestaurantRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RestaurantSeerviceImpl implements RestaurantService{

    @Autowired
    private RestaurantRepository restaurantRepository;

   // Set<List> favourite = new LinkedHashSet<>();

    @Autowired
    private AddressRipository addressRipository;


    @Autowired
    UserRepository userRepository;
    @Autowired
    private IngredientItemRepository ingredientItemRepository;
    @Autowired
    private FoodRepository foodRepository;


    @Override
    public Restaurant crateRestaurant(CreateRestaurantRequest req, User user) {
        if(req==null)
        {
            throw new IllegalArgumentException("CreateRestaurantRequest is null");
        }

        Address address = addressRipository.save(req.getAddress());
        Restaurant restaurant = new Restaurant();
        restaurant.setAddress(address);
        restaurant.setContactInformation(req.getContactInformation());
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
        if (restaurant.getContactInformation()!=null)
            restaurant.setContactInformation(updateRestaurant.getContactInformation());
        if (restaurant.getAddress()!=null)
            restaurant.setAddress(updateRestaurant.getAddress());
        return restaurantRepository.save(restaurant);
    }

    @Override
    public void deleteRestaurant(long restaurantId) throws Exception {

        List<Food> foodIngredients = foodRepository.findByRestaurantId(restaurantId);
        foodRepository.deleteAll(foodIngredients);
        List<IngredientsItems> ingredientsItems = ingredientItemRepository.findByRestaurantId(restaurantId);
        ingredientItemRepository.deleteAll(ingredientsItems);
        Restaurant restaurant = getRestaurantById(restaurantId);
        restaurantRepository.delete(restaurant);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Restaurant> getAllRestaurants() {
        System.out.println("Getting all restaurants...");
        List<Restaurant> restaurants = restaurantRepository.findAll();
        System.out.println("Restaurants: " + restaurants);
        System.out.println("Exiting");
        return restaurants;

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
        Restaurant restaurant=getRestaurantById(restaurantId);

        RestaurantDto dto=new RestaurantDto();
        dto.setTitle(restaurant.getName());
        dto.setImages(restaurant.getImages());
        dto.setId(restaurant.getId());
        dto.setDescription(restaurant.getDescription());

        boolean isFavorited = false;
        List<RestaurantDto> favorites = user.getFavourite();
        for (RestaurantDto favorite : favorites) {
            if (favorite.getId().equals(restaurantId)) {
                isFavorited = true;
                break;
            }
        }

        if (isFavorited) {
            favorites.removeIf(favorite -> favorite.getId().equals(restaurantId));
        } else {
            favorites.add(dto);
        }

        User updatedUser = userRepository.save(user);
        return dto;
    }

    @Override
    public Restaurant updateRestaurantStatus(long id) throws Exception {
        Restaurant restaurant = getRestaurantById(id);
        restaurant.setOpen(!restaurant.isOpen());
        return restaurantRepository.save(restaurant);
    }
}
