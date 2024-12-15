import {api} from "../../Confiig/api";
import { Create_Menu_Items_Request, 
         Create_Menu_Items_Success, 
         Create_Menu_Items_Failure,
         Get_Menu_Item_By_Restaurant_Id_Request,
         Get_Menu_Item_By_Restaurant_Id_Success,
         Get_Menu_Item_By_Restaurant_Id_Failure,
         Delete_Menu_Item_Request,
         Delete_Menu_Item_Success,
         Delete_Menu_Item_Failure,
         Search_Menu_Item_Request,
         Search_Menu_Item_Success,
         Search_Menu_Item_Failure,
         Update_Menu_Item_Availability_Request,
         Update_Menu_Item_Availability_Success,
         Update_Menu_Item_Availability_Failure
        
        } from "./ActionType";

        export const createMenuItems = (menu, jwt) => {
            console.log("menu", menu);
            return async (dispatch) => {
                dispatch({ type: Create_Menu_Items_Request });
                try {
                    const {data} = await api.post("/api/admin/food", menu, {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        }, 
                    });
                    console.log("data", data);
                    dispatch({ type: Create_Menu_Items_Success, payload: data });
                } catch (error) {
                    console.log("error", error);
                    dispatch({ type: Create_Menu_Items_Failure, payload: error });
                }
            };
        };

export const getMenuItemsByRestaurantId = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: Get_Menu_Item_By_Restaurant_Id_Request });
            try {
                const {data} = await api.get(`/api/food/restaurant/${reqData.restaurantId}?vegeterian=${reqData.vegeterian}&nonVeg=${reqData.nonveg}&seasonal=${reqData.seasonal}&food_category=${reqData.foodCategory}`, {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`,
                        },
                });
                dispatch({ type: Get_Menu_Item_By_Restaurant_Id_Success, payload: data });
            } catch (error) {
                console.log("error", error);
                dispatch({ type: Get_Menu_Item_By_Restaurant_Id_Failure, payload: error });
            }
    };
};

export const searchMenuItem = ({keyword, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: Search_Menu_Item_Request });
            try {
                const {data} = await api.get(`/api/food/search?name=${keyword}`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        },
                });
                dispatch({ type: Search_Menu_Item_Success, payload: data });
            } catch (error) {
                console.log("error", error);
                dispatch({ type: Search_Menu_Item_Failure, payload: error });
            }
    };
};

// export const getAllIngredientsOfMenuItem = (reqData) => {
//     return async (dispatch) => {
//         dispatch({type : GET})

export const deleteMenuItem = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: Delete_Menu_Item_Request });
            try {
                const {data} = await api.delete(`/api/admin/food/${reqData.menuItemId}`, {
                    headers: {
                        Authorization: `Bearer ${reqData.jwt}`,
                        },
                });
                dispatch({ type: Delete_Menu_Item_Success, payload: data });
            } catch (error) {
                console.log("error", error);
                dispatch({ type: Delete_Menu_Item_Failure, payload: error });
            }
    };
};

export const updateMenuItemAvailability = ({foodId, jwt}) => {
    return async (dispatch) => {
        dispatch({ type: Update_Menu_Item_Availability_Request });
            try {
                const {data} = await api.put(`/api/admin/food/${foodId}`,{}, {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                        },
                });
                dispatch({ type: Update_Menu_Item_Availability_Success, payload: data });
            } catch (error) {
                console.log("error", error);
                dispatch({ type: Update_Menu_Item_Availability_Failure, payload: error });
            }
    };
};

export const deleteFoodAction = ({foodId,jwt}) => async (dispatch) => {
    dispatch({ type: Delete_Menu_Item_Request });
    try {
      const { data } = await api.delete(`/api/admin/food/${foodId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("delete food ", data);
      dispatch({ type: Delete_Menu_Item_Success, payload: foodId });
    } catch (error) {
      dispatch({ type: Delete_Menu_Item_Failure, payload: error });
    }
  };