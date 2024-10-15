package com.cibus.online.food.ordering.Repository;

import com.cibus.online.food.ordering.Model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food , Long> {
    List<Food> findByRestaurantId(Long restaurantId);
    @Query("SELECT f FROM Food f WHERE f.name LIKE %:name%")
    List<Food> searchByFood(@Param("name") String name);
}