package com.cibus.online.food.ordering.service;

import com.cibus.online.food.ordering.Model.Order;
import com.cibus.online.food.ordering.ressponse.PaymentResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Value;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService{

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Override
    public PaymentResponse createPaymentLink(Order order) throws StripeException {

        Stripe.apiKey=stripeSecretKey;

        System.out.println("order====="+order.getId());
        SessionCreateParams params = SessionCreateParams.builder().addPaymentMethodType(
                SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/payment/success/"+order.getId())
                .setCancelUrl("http://localhost:3000/payment/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("INR")
                                .setUnitAmount(order.getTotalAmount()*100)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Cibus").build()
                                ).build())
                        .build())
                .build();

        Session session = Session.create(params);
        System.out.println("url=====" + session.getUrl());

        PaymentResponse response = new PaymentResponse();
        response.setPaymentURL(session.getUrl());


        return response;
    }
}


















