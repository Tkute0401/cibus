package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.Cart;
import com.cibus.online.food.ordering.Model.CartItems;
import com.cibus.online.food.ordering.Model.User;
import com.cibus.online.food.ordering.request.AddCartItemRequest;

public interface CartService {

    public CartItems addItemToCart(AddCartItemRequest req, String jwt)throws Exception;

    public CartItems updateCartItemQuantity(Long cartItermId, int quantity) throws Exception;

    public Cart removeItemFromCart(Long cartItemId,String jwt) throws Exception;

    public Long calculateCartTotal(Cart cart)throws Exception;

    public Cart findCartById(Long id) throws Exception;

    public Cart findCartByUserId(Long userId) throws  Exception;

    public Cart clearCart(Long userId) throws Exception;
}
























