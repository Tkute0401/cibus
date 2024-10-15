package com.cibus.online.food.ordering.Repository;// Import statements
import com.cibus.online.food.ordering.Model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

// Entities and other imports

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @Query("SELECT r FROM Restaurant r WHERE r.name LIKE %:searchQuery% OR r.description LIKE %:searchQuery%")
    List<Restaurant> findBySearchQuery(@Param("searchQuery") String searchQuery);
    Restaurant findByOwnerId(Long userId);



}
