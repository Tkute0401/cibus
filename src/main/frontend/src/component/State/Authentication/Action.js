import axios from "axios"
import { ADD_TO_FAVORITE_FAILURE, ADD_TO_FAVORITE_REQUEST, ADD_TO_FAVORITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionTypes"
import { api, API_URL } from "../../Confiig/api"

export const registerUser = (reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signup`,reqData.userData)
        if(data.jwt)localStorage.setItem("jwt",data.jwt);
        if(data.role==="ROLE_RESTAURENT_OWNER"){
            reqData.navigate("/admin/restaurant")
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:REGISTER_SUCCESS,payload:data.jwt})
        console.log("Register Success",data)
        
    } catch (error) {
        dispatch({type:REGISTER_FAILURE,payload:error})
        console.log("error",error)
    }

}
export const LoginUser = (reqData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})
    try {
        const {data} = await axios.post(`${API_URL}/auth/signin`,reqData.userData)
        if(data.jwt)localStorage.setItem("jwt",data.jwt);
        if(data.role==="ROLE_RESTAURENT_OWNER" || data.role==="ROLE_ADMIN"){
            reqData.navigate("/admin/restaurant")
        }
        else{
            reqData.navigate("/")
        }
        dispatch({type:LOGIN_SUCCESS,payload:data.jwt})
        console.log("Login Success",data)
        
    } catch (error) {
        dispatch({type:LOGIN_FAILURE,payload:error})
        console.log("error",error)
    }

}

export const GetUser = (jwt)=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})
    try {
        const {data} = await api.get(`/api/user/profile`,{
            headers : {
                Authorization:`Bearer ${jwt}`
            }
        })
        dispatch({type:GET_USER_SUCCESS,payload:data})
        console.log("user profile :" ,data)
        
    } catch (error) {
        dispatch({type:GET_USER_FAILURE,payload:error})
        console.log("error",error)
    }

}

export const addToFavorite = (restaurantId,jwt)=>async(dispatch)=>{
    dispatch({type:ADD_TO_FAVORITE_REQUEST})
    try {
        console.log("restaurant Id          .......",restaurantId);
        const {data} = await api.put(`/api/restaurant/`+restaurantId.restaurantId+`/favorites`,{},{
            headers : {
                Authorization:`Bearer ${restaurantId.jwt}`
            }
        })
        dispatch({type:ADD_TO_FAVORITE_SUCCESS,payload:data})
        console.log("Added to favorite :" ,data)
        
    } catch (error) {
        dispatch({type:ADD_TO_FAVORITE_FAILURE,payload:error})
        console.log("error",error)
    }

}

export const logOut = () => {
    console.log("logout");
    return async (dispatch) => {
      dispatch({ type: LOGOUT });
      localStorage.clear();
    };
  };