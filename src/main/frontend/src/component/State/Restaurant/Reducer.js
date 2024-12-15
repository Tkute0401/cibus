import * as actionTypes from "./ActionType";

const initialstate = {
        restaurants: [],
        restaurant: null,
        userRestaurants: null,
        isLoading: false,
        event: [],
        restaurantEvents:[],
        categories:[],
        error: null
    };
export const restaurantReducer = (state = initialstate, action) => {
    switch (action.type) {
        case actionTypes.Create_Restaurant_Request:
        case actionTypes.Get_All_Restaurants_Request:
        case actionTypes.Get_Restaurant_By_Id_Request:
        case actionTypes.Get_Restaurant_By_User_Id_Request:
        case actionTypes.Update_Restaurant_Request:
        case actionTypes.Delete_Restaurant_Request:
        case actionTypes.Create_Categories_Request:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case actionTypes.Create_Restaurant_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                userRestaurants: action.payload,
            };
        case actionTypes.Get_All_Restaurants_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                restaurants: action.payload
                
            };
        case actionTypes.Get_Restaurant_By_Id_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                restaurant: action.payload
            }
        case actionTypes.Get_Restaurant_By_User_Id_Success:
        case actionTypes.Update_Restaurant_Success:
        case actionTypes.Update_Restaurant_Status_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                userRestaurants: action.payload,
                restaurant: action.payload,
            };
        case actionTypes.Delete_Restaurant_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                restaurants:state.restaurants.filter((item) => item.id !== action.payload),
                userRestaurants:state.userRestaurants.filter((item) => item.id !== action.payload),
            }
        case actionTypes.Create_Events_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                event:[...state.event,action.payload],
                restaurantEvents:[...state.restaurantEvents,action.payload],
            }
        case actionTypes.Get_All_Events_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                event:action.payload
            }
        case actionTypes.Get_Restaurant_Events_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                restaurantEvents:action.payload
            }
        case actionTypes.Delete_Event_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                event:state.event.filter((item) => item.id !== action.payload),
                restaurantEvents:state.restaurantEvents.filter((item) => item.id !== action.payload),
            }
        case actionTypes.Create_Categories_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                categories:[...state.categories,action.payload],
            }
        case actionTypes.Get_Restaurant_Categories_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                categories:action.payload
            }
        case actionTypes.Create_Restaurant_Failure:
        case actionTypes.Get_All_Restaurants_Failure:
        case actionTypes.Get_Restaurant_By_Id_Failure:
        case actionTypes.Update_Restaurant_Failure:
        case actionTypes.Delete_Restaurant_Failure:
        case actionTypes.Create_Categories_Failure:
        case actionTypes.Create_Events_Failure:    
        case actionTypes.Get_Restaurant_Categories_Failure:
        return {
            ...state,
            isLoading: false,
            error: action.payload
        };
        default:
            return state;
    }
}
export default restaurantReducer;