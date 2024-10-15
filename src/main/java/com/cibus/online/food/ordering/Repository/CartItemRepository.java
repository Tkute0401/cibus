package com.cibus.online.food.ordering.Repository;

import com.cibus.online.food.ordering.Model.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItems , Long> {



}
