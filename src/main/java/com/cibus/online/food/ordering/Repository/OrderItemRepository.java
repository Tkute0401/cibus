package com.cibus.online.food.ordering.Repository;

import com.cibus.online.food.ordering.Model.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItems , Long> {


}
