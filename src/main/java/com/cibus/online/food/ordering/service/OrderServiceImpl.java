package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.*;
import com.cibus.online.food.ordering.Repository.*;
import com.cibus.online.food.ordering.request.OrderRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private AddressRipository addressRipository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private RestaurantService restaurantService;

    @Override
    public Order createOrder(OrderRequest order, User user) throws Exception {
        Address deliveryAddress = order.getDeliveryAddress();
        Address savedAddress = addressRipository.save(deliveryAddress);

        if(!user.getAddresses().contains(savedAddress)){
            user.getAddresses().add(savedAddress);
            userRepository.save(user);
        }
        Restaurant restaurant = restaurantService.getRestaurantById(order.getRestaurantId());

        Order createdOrder = new Order();
        createdOrder.setCustomer(user);
        createdOrder.setCreatedAt(new Date());
        createdOrder.setOrderStaus("Pending");
        createdOrder.setDeliveryAddress(savedAddress);
        createdOrder.setRestaurant(restaurant);

        Cart cart =cartService.findCartByUserId(user.getId());

        List<OrderItems> orderItems = new ArrayList<>();
        for(CartItems cartItems : cart.getItems()){
            OrderItems orderItem= new OrderItems();
            orderItem.setFood(cartItems.getFood());
            orderItem.setIngredients(new ArrayList<>(cartItems.getIngredients()));
            orderItem.setQuantity(cartItems.getQuantity());
            orderItem.setTotalPrice(cartItems.getTotalPrice());

            OrderItems savedOrderItem = orderItemRepository.save(orderItem);
            orderItems.add(savedOrderItem);
            createdOrder.setOrderItems(orderItems);
            System.out.println("TOTALLLLLLLLLLLL="+cart.getTotal());
            createdOrder.setTotalAmount(cart.getTotal());
            createdOrder.setTotalItems(cart.getItems().size());
        }
        Order savedOrder = orderRepository.save(createdOrder);
        restaurant.getOrders().add(savedOrder);
        return createdOrder;
    }
    @Override
    public Order updateOrder(Long orderId, String orderStatus) throws Exception {
        Order order = getOrderById(orderId);
        if(orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED") || orderStatus.equals("COMPLEATED")||orderStatus.equals("PENDING")){

            order.setOrderStaus(orderStatus);
            return orderRepository.save(order);
        }
        throw new Exception("PLEASE select valid order status");
    }

    @Override
    public void cancelOrder(Long orderId) throws Exception {
        orderRepository.deleteById(orderId);
    }

    @Override
    public List<Order> getUsersOrders(Long userId) throws Exception {
        return orderRepository.findByCustomerId(userId);
    }

    @Override
    public List<Order> getRestaurantOrders(Long restaurantId, String orderStatus) throws Exception {
        List<Order> orders =  orderRepository.findByRestaurantId(restaurantId);
        if(orderStatus!=null){
            orders = orders.stream().filter(order -> order.getOrderStaus().equals(orderStatus)).collect(Collectors.toList());
        }
        return orders;
    }

    @Override
    public Order getOrderById(Long orderId) throws Exception {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if(optionalOrder.isEmpty()){
            throw new Exception("Order not found");
        }
        return optionalOrder.get();
    }
}
