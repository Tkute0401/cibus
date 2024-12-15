package com.cibus.online.food.ordering.Repository;

import com.cibus.online.food.ordering.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CAtegoryRepository extends JpaRepository<Category , Long> {

    public List<Category> findByRestaurantId(Long id);




}
