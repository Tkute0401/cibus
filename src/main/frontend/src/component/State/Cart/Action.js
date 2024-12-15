import {
    Find_Cart_Request,
    Find_Cart_Success,
    Find_Cart_Failure,

    Clear_Cart_Request,
    Clear_Cart_Success,
    Clear_Cart_Failure,

    Get_All_Cart_Items_Request,
    Get_All_Cart_Items_Success,
    Get_All_Cart_Items_Failure,

    Add_Item_To_Cart_Request,
    Add_Item_To_Cart_Success,
    Add_Item_To_Cart_Failure,

    Update_Cart_Item_Request,
    Update_Cart_Item_Success,
    Update_Cart_Item_Failure,

    Remove_Cart_Item_Request,
    Remove_Cart_Item_Success,
    Remove_Cart_Item_Failure
} from "./ActionType";
import { api } from "../../Confiig/api";
export const findCart = (token) => {
    return async (dispatch) => {
        dispatch({ type: Find_Cart_Request });
        try {
            const response = await api.get("/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("my cart =" , response.data);
            dispatch({ type: Find_Cart_Success, payload: response.data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: Find_Cart_Failure, payload: error });
        }
    };
}

export const getAllCartItems = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: Get_All_Cart_Items_Request });
        try {
            const response = await api.get("/api/carts/${reqData.cartId}/items", {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            dispatch({ type: Get_All_Cart_Items_Success, payload: response.data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: Get_All_Cart_Items_Failure, payload: error });
        }
    };
};

export const addItemToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: Add_Item_To_Cart_Request });
        try {
            console.log("token:" , reqData.token)
            const response = await api.put(`/api/cart/add`, reqData.cartItem, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            dispatch({ type: Add_Item_To_Cart_Success, payload: response.data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: Add_Item_To_Cart_Failure, payload: error });
        }
    };
};

export const updateCartItem = (reqData) => {
    console.log("jwt",reqData.data.token);
    return async (dispatch) => {
        dispatch({ type: Update_Cart_Item_Request });
        try {
            const response = await api.put(`/api/cart-item/update`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.data.token}`,
                },
            });
            dispatch({ type: Update_Cart_Item_Success, payload: response.data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: Update_Cart_Item_Failure, payload: error });
        }
    };
};


export const removeCartItem = (cartItemId,jwt) => {
    return async (dispatch) => {
        dispatch({ type: Remove_Cart_Item_Request });
        try {
            const {data} = await api.delete(`/api/cart-item/${cartItemId}/remove`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            dispatch({ type: Remove_Cart_Item_Success, payload: cartItemId });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: Remove_Cart_Item_Failure, payload: error });
        }
    };
};

export const clearCart = () => {
    return async (dispatch) => {
        dispatch({ type: Clear_Cart_Request });
        try {
            const response = await api.put("/api/cart/clear",{}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
            });
            dispatch({ type: Clear_Cart_Success, payload: response.data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: Clear_Cart_Failure, payload: error });
        }
    };
};
