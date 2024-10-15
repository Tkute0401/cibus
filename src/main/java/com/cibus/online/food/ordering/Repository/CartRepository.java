package com.cibus.online.food.ordering.Repository;

import com.cibus.online.food.ordering.Model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart , Long> {

    public Cart findByCustomerId(Long userId);


}
