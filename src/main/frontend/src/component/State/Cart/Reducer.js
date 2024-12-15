import * as actiontype from "./ActionType";
import{LOGOUT} from "../Authentication/ActionTypes";
const initialstate = {
    cart:null,
    cartItems: [],
    isLoading: false,
    error: null,
};

export const cartReducer = (state = initialstate, action) => {
    switch (action.type) {
        case actiontype.Find_Cart_Request:
        case actiontype.Get_All_Cart_Items_Request:
        case actiontype.Remove_Cart_Item_Request:
        case actiontype.Update_Cart_Item_Request:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case actiontype.Find_Cart_Success:
        case actiontype.Clear_Cart_Success:
            return {
                ...state,
                isLoading: false,
                cart: action.payload,
                cartItems: action.payload.items,
            };
        case actiontype.Add_Item_To_Cart_Success:
            return {
                ...state,
                isLoading: false,
                cartItems: [ action.payload, ...state.cartItems],
            };
        case actiontype.Update_Cart_Item_Success:
            return {
                ...state,
                isLoading: false,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.id
                        ? action.payload : item),
                        
            };    
        case actiontype.Remove_Cart_Item_Success:
            return {
                ...state,
                isLoading: false,
                cartItems: state.cartItems.filter((item) => item.id !== action.payload),
            };
        case actiontype.Find_Cart_Failure:
        case actiontype.Update_Cart_Item_Failure:
        case actiontype.Remove_Cart_Item_Failure:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case LOGOUT:
            localStorage.removeItem("jwt");
            return{ ...state, cartItems:[], cart:null , success:"Logout Success"};
        default:
            return state;    
    }
}
export default cartReducer