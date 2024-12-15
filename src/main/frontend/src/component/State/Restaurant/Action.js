import { Create_Restaurant_Request,
    Create_Restaurant_Success,
    Create_Restaurant_Failure,
    Get_All_Restaurants_Request,
    Get_All_Restaurants_Success,
    Get_All_Restaurants_Failure,
    Delete_Restaurant_Request,
    Delete_Restaurant_Success,
    Delete_Restaurant_Failure,
    Update_Restaurant_Request,
    Update_Restaurant_Success,
    Update_Restaurant_Failure,
    Get_Restaurant_By_Id_Request,
    Get_Restaurant_By_Id_Success,
    Get_Restaurant_By_Id_Failure,
    Get_Restaurant_By_User_Id_Request,
    Get_Restaurant_By_User_Id_Success,
    Get_Restaurant_By_User_Id_Failure,
    Update_Restaurant_Status_Request,
    Update_Restaurant_Status_Success,
    Update_Restaurant_Status_Failure,
    Create_Events_Request,
    Create_Events_Success,
    Create_Events_Failure,
    Get_All_Events_Request,
    Get_All_Events_Success,
    Get_All_Events_Failure,
    Delete_Event_Request,
    Delete_Event_Success,
    Delete_Event_Failure,
    Get_Restaurant_Events_Request,
    Get_Restaurant_Events_Success,
    Get_Restaurant_Events_Failure,
    Create_Categories_Request,
    Create_Categories_Success,
    Create_Categories_Failure,
    Get_Restaurant_Categories_Request,
    Get_Restaurant_Categories_Success,
    Get_Restaurant_Categories_Failure
          } from "./ActionType";
import { api } from "../../Confiig/api";
export const getAllReastaurantsAction = (token) => {
    return async (dispatch) => {
        dispatch({ type: Get_All_Restaurants_Request });
        try {
            const response = await api.get("/api/restaurant", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: Get_All_Restaurants_Success, payload: response.data });
            console.log("all restaurants", response.data);
        } catch (error) {
            console.log("error", error);
            dispatch({ type: Get_All_Restaurants_Failure, payload: error });
        }
    };
};
export const getRestaurantById = (reqData) =>{
    console.log("reqData",reqData);

    return async (dispatch) => {
        dispatch({ type: Get_Restaurant_By_Id_Request });
        try {
            const response = await api.get(`/api/restaurant/${reqData.restaurantId}` , {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`,
                },
            });
            dispatch({ type: Get_Restaurant_By_Id_Success, payload: response.data });

        } catch (error) {
            console.log("error", error);
            dispatch({ type: Get_Restaurant_By_Id_Failure, payload: error });
        }
    };
};

export const getRestaurantByUserId = (jwt) =>{

    return async (dispatch) => {
        dispatch({ type: Get_Restaurant_By_User_Id_Request });
        try {
            const response = await api.get(`/api/admin/restaurant/user`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("reststaurant by user id", response.data);
            dispatch({ type: Get_Restaurant_By_User_Id_Success, payload: response.data });

        } catch (error) {
            console.log("error", error);
            dispatch({ type: Get_Restaurant_By_User_Id_Failure, payload: error });
        }
    };
};

export const createRestaurant = (reqData) =>{
    console.log("Token",reqData.token)
    console.log("reqData",reqData);

    return async (dispatch) => {
        dispatch({ type: Create_Restaurant_Request });
        try {
            const response = await api.post(`/api/admin/restaurant`, reqData.data, {
                headers: {
                    Authorization: `Bearer ${reqData.token}`,
                },
            });
            dispatch({ type: Create_Restaurant_Success, payload: response.data });
            console.log("reststaurant created", response.data);

        } catch (error) {
            console.log("error", error);
            dispatch({ type: Create_Restaurant_Failure, payload: error });
        }
    };
};

export const updateRestaurant = ({restaurantId,restaurantData,jwt}) =>{
    return async (dispatch) => {
        dispatch({ type: Update_Restaurant_Request });
        try {
            const response = await api.put(`/api/admin/restaurants/${restaurantId}`,restaurantData, 
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
    
            );
            dispatch({ type: Update_Restaurant_Success, payload: response.data });
            console.log("reststaurant updated", response.data);

        } catch (error) {
            console.log("error", error);
            dispatch({ type: Update_Restaurant_Failure, payload: error });
        }      
    };
};

export const deleteRestaurant = ({restaurantId,jwt}) =>{
    return async (dispatch) => {
        dispatch({ type: Delete_Restaurant_Request });
        try {
            const response = await api.delete(`/api/admin/restaurants/${restaurantId}`, 
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
    
            );
            dispatch({ type: Delete_Restaurant_Success, payload: response.data });
            console.log("reststaurant deleted", response.data);

        } catch (error) {        
            dispatch({ type: Delete_Restaurant_Failure, payload: error });
            console.log("error", error);
        }      
    };
};

export const updateRestaurantStatus = ({restaurantId,jwt}) =>{
    return async (dispatch) => {
        dispatch({ type: Update_Restaurant_Status_Request });
        try {
            const response = await api.put(`/api/admin/restaurant/${restaurantId}/status`,{}, 
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
    
            );
            dispatch({ type: Update_Restaurant_Status_Success, payload: response.data });
            console.log("reststaurant status updated", response.data);

        } catch (error) {        
            dispatch({ type: Update_Restaurant_Status_Failure, payload: error });
            console.log("error", error);
        }      
    };
};

export const createEvents = ({data,jwt,restaurantId}) =>{
    console.log("data",data);
    console.log("id",restaurantId);
    console.log("description",data.Description);
    return async (dispatch) => {
        dispatch({ type: Create_Events_Request });
        try {
            const response = await api.post(`api/admin/events/restaurant/${restaurantId}`,data, 
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
    
            );
            dispatch({ type: Create_Events_Success, payload: response.data });
            console.log("reststaurant events created", response.data);

        } catch (error) {
            console.log("error", error);
            dispatch({ type: Create_Events_Failure, payload: error });
        }      
    };
};

export const getAllEvents = ({jwt}) =>{
    return async (dispatch) => {
        dispatch({ type: Get_All_Events_Request });
        try {
            const response = await api.get(`/api/events`, 
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
    
            );
            dispatch({ type: Get_All_Events_Success, payload: response.data });
            console.log("all events", response.data);

        } catch (error) {        
            dispatch({ type: Get_All_Events_Failure, payload: error });
            console.log("error", error);
        }      
    };  
};

export const deleteEvent = ({eventId,jwt}) =>{
    return async (dispatch) => {
        dispatch({ type: Delete_Event_Request });
        try { 
            const response = await api.delete(`/api/admin/events/${eventId}`, 
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
    
            );
            dispatch({ type: Delete_Event_Success, payload: response.data });
            console.log("event deleted", response.data);
        }

        catch (error) {        
            dispatch({ type: Delete_Event_Failure, payload: error });
            console.log("error", error);
        }
    };
};

export const getRestaurantEvents = ({restaurantId,jwt}) =>{
    return async (dispatch) => {
        dispatch({ type: Get_Restaurant_Events_Request });
        try {
            const response = await api.get(`/admin/events/restaurants/${restaurantId}`, 
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
    
            );
            dispatch({ type: Get_Restaurant_Events_Success, payload: response.data });
            console.log("all events", response.data);

        } catch (error) {        
            dispatch({ type: Get_Restaurant_Events_Failure, payload: error });
            console.log("error", error);
        }      
    };
};

export const createCategory = (data,jwt) =>{
    return async (dispatch) => {
        dispatch({ type: Create_Categories_Request });
        try {
            const response = await api.post(`/api/admin/category`,data, 
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
    
            );
            dispatch({ type: Create_Categories_Success, payload: response.data });
            console.log("category created", response.data);

        } catch (error) {        
            dispatch({ type: Create_Categories_Failure, payload: error });
            console.log("error", error);
        }      
    };
};

export const getRestaurantCategories = (jwt,restaurantId) =>{
    return async (dispatch) => {
        dispatch({ type: Get_Restaurant_Categories_Request });
        try {
            const response = await api.get(`/api/category/restaurant/${restaurantId}`, 
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
    
            );
            dispatch({ type: Get_Restaurant_Categories_Success, payload: response.data });
            console.log("all categories", response.data);

        } catch (error) {        
            dispatch({ type: Get_Restaurant_Categories_Failure, payload: error });
            console.log("error", error);
        }      
    };
};
