package com.cibus.online.food.ordering.Repository;

import com.cibus.online.food.ordering.Model.Order;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order , Long> {

    public List<Order> findByCustomerId(Long userId);
    public List<Order> findByRestaurantId(Long restaurantId);

}
