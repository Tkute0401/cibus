package com.cibus.online.food.ordering.Repository;

import com.cibus.online.food.ordering.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CAtegoryRepository extends JpaRepository<Category , Long> {

    public List<Category> findByRestaurantId(Long id);




}
