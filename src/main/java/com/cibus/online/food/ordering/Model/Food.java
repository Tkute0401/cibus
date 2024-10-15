package com.cibus.online.food.ordering.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.PrivateKey;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private String description;
    private long price;

    @ManyToOne
    private Category foodCategory;

    @Column(length = 1000)
    @ElementCollection
    private List<String> images = new ArrayList<>();

    private boolean available;

    @ManyToOne
    private Restaurant restaurant;

    private boolean isVegitarian;
    private boolean isSeasonal;

    @ManyToMany
    private List<IngredientsItems> ingredients = new ArrayList<>();


    private Date creationDate;
}
