package com.cibus.online.food.ordering.Model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @OneToOne
    @JoinColumn(name = "owner_id")
    //@ToString.Exclude
    //@JsonIgnore
    private User owner;

    private String name;
    private String description;
    private String cuisineType;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Embedded
    private ContactInfo contactInformation;

    private String openingHours;


    @JsonIgnore
    @OneToMany(mappedBy="restaurant",cascade = CascadeType.ALL,orphanRemoval = true)
    @ToString.Exclude
    private List<Order> orders=new ArrayList<>();

    private int numRating;

    @ElementCollection
    @Column(length = 1000)
    private List<String> images;

    private LocalDateTime registrationDate;

    private boolean open;

    @JsonIgnore
    @ToString.Exclude
    @OneToMany(mappedBy = "restaurant",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Food> foods=new ArrayList<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @ToString.Exclude
    private List<Category> categories=new ArrayList<>();


}

