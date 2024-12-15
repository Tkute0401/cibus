package com.cibus.online.food.ordering.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "cart_item")
public class CartItems {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JsonIgnore
    private Cart cart;

    @ManyToOne
    private Food food;

    private int quantity;

    @ToString.Exclude
    @JsonIgnore
    @ElementCollection
    @CollectionTable(
            name = "cart_item_ingredients",
            joinColumns = @JoinColumn(name = "cart_item_id"),
            foreignKey = @ForeignKey(name = "fk_cart_item_ingredients_ingredients", foreignKeyDefinition = "FOREIGN KEY (ingredients_id) REFERENCES ingredients_item (id) ON DELETE CASCADE"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"cart_item_id", "ingredients_id"}, name = "uc_cart_item_ingredients")
    )
    private List<IngredientsItems> ingredients;


    private long totalPrice;





}
