package com.cibus.online.food.ordering.Repository;

import com.cibus.online.food.ordering.Model.IngredientsItems;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IngredientItemRepository extends JpaRepository<IngredientsItems , Long> {

    List<IngredientsItems> findByRestaurantId(Long id);




}
