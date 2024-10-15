package com.cibus.online.food.ordering.CONTROLLER;

import com.cibus.online.food.ordering.Model.Order;
import com.cibus.online.food.ordering.Model.Restaurant;
import com.cibus.online.food.ordering.Model.User;
import com.cibus.online.food.ordering.request.OrderRequest;
import com.cibus.online.food.ordering.service.OrderService;
import com.cibus.online.food.ordering.service.RestaurantService;
import com.cibus.online.food.ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/order/restaurant/{id}")
    public ResponseEntity<List<Order>> getOrderHistory(@PathVariable Long id, @RequestParam(required = false) String order_Status,@RequestHeader("Authorization") String jwt) throws Exception{
        List<Order> order = orderService.getRestaurantOrders(id,order_Status);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

    @PutMapping("/order/{orderId}/{orderStatus}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @PathVariable String orderStatus,@RequestHeader("Authorization") String jwt) throws Exception{
        Order order = orderService.updateOrder(id,orderStatus);

        return new ResponseEntity<>(order, HttpStatus.OK);
    }

}



























