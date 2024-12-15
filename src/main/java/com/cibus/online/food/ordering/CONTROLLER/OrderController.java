package com.cibus.online.food.ordering.CONTROLLER;

import com.cibus.online.food.ordering.Model.CartItems;
import com.cibus.online.food.ordering.Model.Order;
import com.cibus.online.food.ordering.Model.User;
import com.cibus.online.food.ordering.request.AddCartItemRequest;
import com.cibus.online.food.ordering.request.OrderRequest;
import com.cibus.online.food.ordering.ressponse.PaymentResponse;
import com.cibus.online.food.ordering.service.OrderService;
import com.cibus.online.food.ordering.service.PaymentService;
import com.cibus.online.food.ordering.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private UserService userService;

    @PostMapping("/order")
    public ResponseEntity<PaymentResponse> createOrder(@RequestBody OrderRequest req, @RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.createOrder(req,user);
        PaymentResponse res = paymentService.createPaymentLink(order);
        System.out.println("ordersaer"+order.getId());
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
    @GetMapping("/order/user")
    public ResponseEntity<List<Order>> getOrderHistory(@RequestHeader("Authorization") String jwt) throws Exception{

        User user = userService.findUserByJwtToken(jwt);
        List<Order> order = orderService.getUsersOrders(user.getId());

        return new ResponseEntity<>(order, HttpStatus.OK);
    }




}

























