package com.cibus.online.food.ordering.Repository;

import com.cibus.online.food.ordering.Model.IngredientsCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IngredientCategoryRepository extends JpaRepository<IngredientsCategory , Long> {
    List<IngredientsCategory> findByRestaurantId(Long id);
}
