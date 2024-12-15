package com.cibus.online.food.ordering.ressponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApiResponse {
	
	private String message;
	private boolean status;

}
