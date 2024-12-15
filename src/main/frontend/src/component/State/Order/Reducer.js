import{
    Get_Users_Orders_Request,
    Get_Users_Orders_Success,
    Get_Users_Orders_Failure,
    //Get_Users_Notifications_Success
} from "./ActionType";

const initialstate = {
    orders: [],
    isLoading: false,
    error: null,
    //notifications: [],
};

export const orderReducer = (state = initialstate, {type, payload}) => {
    switch (type) {
        case Get_Users_Orders_Request:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case Get_Users_Orders_Success:
            return {
                ...state,
                isLoading: false,
                orders: payload,
                error: null,
            };
        // case Get_Users_Notifications_Success:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         notifications:payload,
        //         error: null,
        // }
        case Get_Users_Orders_Failure:
            return {
                ...state,
                isLoading: false,
                error: payload,
            };
        default:
            return state;
    }
};
        export default orderReducer;