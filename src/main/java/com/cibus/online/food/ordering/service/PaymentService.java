package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.Order;
import com.cibus.online.food.ordering.ressponse.PaymentResponse;
import com.stripe.exception.StripeException;
import lombok.Data;
import org.springframework.stereotype.Service;


@Service
public interface PaymentService {
    public PaymentResponse createPaymentLink(Order order) throws StripeException;
}
