package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.Order;
import com.cibus.online.food.ordering.Model.User;
import com.cibus.online.food.ordering.request.OrderRequest;

import java.util.List;

public interface OrderService {

    public Order createOrder(OrderRequest order, User user)throws Exception;

    public Order updateOrder(Long orderId,String orderStatus)throws Exception;

    public void cancelOrder(Long orderId )throws Exception;

    public List<Order> getUsersOrders(Long userId)throws Exception;

    public List<Order> getRestaurantOrders(Long restaurantId, String orderStatus)throws Exception;

    public Order getOrderById(Long orderId) throws Exception;



}
