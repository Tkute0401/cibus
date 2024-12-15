package com.cibus.online.food.ordering.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Table(name = "order_item")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderItems {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    private Food food;

    private int quantity;
    private long totalPrice;

    @ToString.Exclude
    @JsonIgnore
    @ElementCollection
    @CollectionTable(
            name = "order_item_ingredients",
            joinColumns = @JoinColumn(name = "order_item_id"),
            foreignKey = @ForeignKey(name = "fk_order_item_ingredients_ingredients", foreignKeyDefinition = "FOREIGN KEY (ingredients_id) REFERENCES ingredients_item (id) ON DELETE CASCADE"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"oorder_item_id", "ingredients_id"}, name = "uc_order_item_ingredients")
    )
    private List<IngredientsItems> ingredients;


}
