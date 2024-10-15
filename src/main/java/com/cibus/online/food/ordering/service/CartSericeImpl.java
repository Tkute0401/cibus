package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.Cart;
import com.cibus.online.food.ordering.Model.CartItems;
import com.cibus.online.food.ordering.Model.Food;
import com.cibus.online.food.ordering.Model.User;
import com.cibus.online.food.ordering.Repository.CartItemRepository;
import com.cibus.online.food.ordering.Repository.CartRepository;
import com.cibus.online.food.ordering.Repository.FoodRepository;
import com.cibus.online.food.ordering.request.AddCartItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartSericeImpl implements CartService{

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private FoodService foodService;
    @Override
    public CartItems addItemToCart(AddCartItemRequest req, String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Food food =foodService.getFoodById(req.getFoodId());
        Cart cart = cartRepository.findByCustomerId(user.getId());
        for(CartItems cartItems : cart.getItems()){
            if(cartItems.getFood().equals(food)){
                int newQuantity = cartItems.getQuantity()+req.getQuantity();
                return updateCartItemQuantity(cartItems.getId(),newQuantity);
            }
        }

        CartItems newCartItem = new CartItems();
        newCartItem.setFood(food);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(req.getQuantity());
        newCartItem.setIngredients(req.getIngredients());
        newCartItem.setTotalPrice(req.getQuantity()*food.getPrice());

        CartItems savedCartItem = cartItemRepository.save(newCartItem);

        cart.getItems().add(savedCartItem);
        return savedCartItem;
    }

    @Override
    public CartItems updateCartItemQuantity(Long cartItermId, int quantity) throws Exception {
        Optional<CartItems> cartItemopt = cartItemRepository.findById(cartItermId);
        if(cartItemopt.isEmpty()){
            throw new Exception("Cart item not found");
        }
        CartItems item = cartItemopt.get();
        item.setQuantity(quantity);
        item.setTotalPrice(item.getFood().getPrice()*quantity);
        return cartItemRepository.save(item);
    }

    @Override
    public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Cart cart = cartRepository.findByCustomerId(user.getId());

        Optional<CartItems> cartItemopt = cartItemRepository.findById(cartItemId);
        if(cartItemopt.isEmpty()){
            throw new Exception("Cart item not found");
        }
        CartItems item = cartItemopt.get();
        cart.getItems().remove(item);
        return cartRepository.save(cart);
    }
    @Override
    public Long calculateCartTotal(Cart cart) throws Exception {
        Long total = 0L;
        for(CartItems cartItems : cart.getItems()){
            total += cartItems.getFood().getPrice()*cartItems.getQuantity();
        }
        return total;
    }

    @Override
    public Cart findCartById(Long id) throws Exception {
        Optional<Cart> optionalCart = cartRepository.findById(id);
        if(optionalCart.isEmpty())
        {
            throw new Exception("cart not found");
        }
        return optionalCart.get();
    }

    @Override
    public Cart findCartByUserId(Long userId) throws Exception {
        Cart cart = cartRepository.findByCustomerId(userId);
        cart.setTotal(calculateCartTotal(cart));
        return cart;
    }

    @Override
    public Cart clearCart(Long userId) throws Exception {
        Cart cart = findCartByUserId(userId);
        cart.getItems().clear();
        return cartRepository.save(cart);
    }
}