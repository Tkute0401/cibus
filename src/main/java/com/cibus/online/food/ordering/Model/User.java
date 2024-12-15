package com.cibus.online.food.ordering.Model;
import com.cibus.online.food.ordering.dto.RestaurantDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name,email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;


    private USER_ROLE role=USER_ROLE.ROLE_CUSTOMER;


    @ToString.Exclude
    @OneToMany
    @JsonIgnore
    private List<Order> orders = new ArrayList<>();

    @ElementCollection
    private List<RestaurantDto> Favourite = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses = new ArrayList<>();
    public void setUsers(String name,String email,String password){
        this.name=name;
        this.email=email;
        this.password=password;
    }

}
