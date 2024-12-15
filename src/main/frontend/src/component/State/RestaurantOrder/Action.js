
import { GET_Restaurant_Orders_Request,
    GET_Restaurant_Orders_Success,
    GET_Restaurant_Orders_Failure,
    Update_Order_Status_Request,
    Update_Order_Status_Success,
    Update_Order_Status_Failure,} from "./ActionType";
    import {api} from "../../Confiig/api";
    
    export const updateOrderStatus = (orderId, status, jwt) => async (dispatch) => {
        return async (dispatch) => {
            dispatch({ type: Update_Order_Status_Request });
            try {
                const response = await api.put(`/api/admin/orders/${orderId}/${status}`, { status }, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                dispatch({ type: Update_Order_Status_Success, payload: response.data });
            } catch (error) {
                console.log("error", error);
                dispatch({ type: Update_Order_Status_Failure, payload: error });
            }
        };
    };
    export const fetchRestaurantOrders = (restaurantId, status, jwt) => async (dispatch) => {
        console.log('fetchRestaurantOrders called with:', restaurantId, status, jwt);
        try {
          const response = await api.get(`/api/admin/order/restaurant/${restaurantId}`, {
            params: { order_status: status },
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });
          console.log('API response:', response);
          dispatch({ type: GET_Restaurant_Orders_Success, payload: response.data });
        } catch (error) {
          console.error('API error:', error);
          dispatch({ type: GET_Restaurant_Orders_Failure, payload: error });
        }
      };

    // export const fetchRestaurantOrders = (restaurantId, status, jwt) => async (dispatch) => {
    //     console.log("status",status);
    //     const encodedStatus = encodeURIComponent(status);
    //     return async (dispatch) => {
    //         console.log("status2",status);
    //         dispatch({ type: GET_Restaurant_Orders_Request });
    //         try {
    //             console.log("status3",status);
    //             const response = await api.get(`/api/admin/order/restaurant/${restaurantId}`, 
    //                 {
    //                 params: {order_status: encodedStatus},
    //                 headers: {
    //                     Authorization: `Bearer ${jwt}`,
    //                 },
    //             });
    //             console.log("reststaurant orders", response.data);
    //             dispatch({ type: GET_Restaurant_Orders_Success, payload: response.data });
    //         } catch (error) {
    //             console.log("error", error);
    //             dispatch({ type: GET_Restaurant_Orders_Failure, payload: error });
    //         }   
    //     };
    // };