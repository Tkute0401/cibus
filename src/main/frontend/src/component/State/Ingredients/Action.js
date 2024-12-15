import {api} from "../../Confiig/api"
import { 
    Create_Ingredients_Success,
    Create_Ingredients_Failure,
    Create_Ingredients_Category_Success,
    Create_Ingredients_Category_Failure,
    Get_Ingredients_Category_Success,
    Get_Ingredients_Category_Failure,
    Get_Ingredients,
    Update_Stock
} from "./ActionType";
export const getIngredientsOfRestaurant = ({id,jwt}) => {
    return async (dispatch) => {
      try {
        const response = await api.get(`/api/admin/ingredients/restaurant/${id}`,{
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log("get all ingredients ",response.data)
        dispatch({
          type: Get_Ingredients,
          payload: response.data // Assuming the response contains the ingredients data
        });
      } catch (error) {
          console.log("error",error)
        // Handle error, dispatch an error action, etc.
      }
    };
  };
export const createIngredients = ({data,jwt}) =>{
    return async (dispatch) => {
        try{
            const response = await api.post(`/api/admin/ingredients`,data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                dispatch({ type: Create_Ingredients_Success, payload: response.data });
                console.log("ingredients created", response.data);
        }
        catch(error){
            dispatch({ type: Create_Ingredients_Failure, payload: error });
            console.log("error", error);
        }
    };
};

export const createIngredientsCategory = ({data,jwt}) =>{
    console.log("data",data,"jwt",jwt);
    return async (dispatch) => {
        try{
            const response = await api.post(`/api/admin/ingredients/category`,data,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                dispatch({ type: Create_Ingredients_Category_Success, payload: response.data });
                console.log("ingredients category created", response.data);
        }
        catch(error){
            dispatch({ type: Create_Ingredients_Category_Failure, payload: error });
            console.log("error", error);
        }
    };
};

export const getIngredientsCategory = ({id, jwt}) =>{
    return async (dispatch) => {
        try{
            const response = await api.get(`/api/admin/ingredients/restaurant/${id}/category`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                dispatch({ type: Get_Ingredients_Category_Success, payload: response.data });
                console.log("ingredients category", response.data);
        }
        catch(error){
            dispatch({ type: Get_Ingredients_Category_Failure, payload: error });
            console.log("error", error);
        }
    };
};

export const updateStock = ({id,jwt}) => {
    return async (dispatch) => {
      try {
        const {data} = await api.put(`/api/admin/ingredients/${id}/stock`, 
        { },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        dispatch({
          type: Update_Stock,
          payload: data
        });
        console.log("update ingredients stock ",data)
      } catch (error) {
          console.log("error ",error)
        // Handle error, dispatch an error action, etc.
      }
    };
  };