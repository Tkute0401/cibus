import {
    GET_Restaurant_Orders_Request,
    GET_Restaurant_Orders_Success,
    GET_Restaurant_Orders_Failure,
    Update_Order_Status_Request,
    Update_Order_Status_Success,
    Update_Order_Status_Failure,
} from "./ActionType";

const initialstate = {
    orders: [],
    isLoading: false,
    error: null,
};

const restaurantOrderReducer = (state = initialstate, action) => {
    switch (action.type) {
        case GET_Restaurant_Orders_Request:
        case Update_Order_Status_Request:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case GET_Restaurant_Orders_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                orders: action.payload,
            };
        case Update_Order_Status_Success:
            const updatedOrders = state.orders.map((order) => 
                order.id===action.payload.id?action.payload:order);
            return {
                ...state,
                isLoading: false,
                error: null,
                orders: updatedOrders,
            };
        case GET_Restaurant_Orders_Failure:
        case Update_Order_Status_Failure:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
export default restaurantOrderReducer;