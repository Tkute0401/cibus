package com.cibus.online.food.ordering.Repository;

import com.cibus.online.food.ordering.Model.IngredientsItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface IngredientItemRepository extends JpaRepository<IngredientsItems , Long> {

    List<IngredientsItems> findByRestaurantId(Long id);




}
