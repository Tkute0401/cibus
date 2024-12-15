import { use } from "react";
import {api} from "../../Confiig/api";
import { Create_Order_Request,
         Create_Order_Success,
         Create_Order_Failure,
         Get_Users_Orders_Request,
         Get_Users_Orders_Success,
         Get_Users_Orders_Failure,
        //  Get_Users_Notifications_Request,
        //  Get_Users_Notifications_Success,
        //  Get_Users_Notifications_Failure 
        } from "./ActionType";
import { useSelector } from "react-redux";

export const createOrder = (reqData) => {
    
    
    console.log("order details = ", reqData);
    return async (dispatch) => {
        dispatch({ type: Create_Order_Request });
        try {
            const {data} = await api.post("/api/order", reqData.order, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            
            console.log("payment url = ", data.paymentUrl);
            console.log("data = ", data.paymentURL);
                
            if(data.paymentURL){

                window.location.href = data.paymentURL;
            }
            dispatch({ type: Create_Order_Success, payload: data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: Create_Order_Failure, payload: error });
        }
    }    
}

export const getUserOrders = (jwt) => {
    return async (dispatch) => {
        dispatch({ type: Get_Users_Orders_Request });
        try {
            const {data} = await api.get("/api/order/user", {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("my orders = ", data);
            dispatch({ type: Get_Users_Orders_Success, payload: data });
        } catch (error) {
            console.log("error", error);
            dispatch({ type: Get_Users_Orders_Failure, payload: error });
        }
    }
}

// export const getUsersNotifications = () => {
//     return async (dispatch) => {
//         dispatch({ type: Get_Users_Notifications_Request });
//         try {
//             const {data} = await api.get("/api/notifications");
//             dispatch({ type: Get_Users_Notifications_Success, payload: data });
//         } catch (error) {
//             console.log("error", error);
//             dispatch({ type: Get_Users_Notifications_Failure, payload: error });
//         }
//     }
// }