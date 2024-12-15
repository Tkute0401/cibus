package com.cibus.online.food.ordering.Repository;

import com.cibus.online.food.ordering.Model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRipository extends JpaRepository<Address,Long> {
}
