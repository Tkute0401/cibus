import * as actiontypes from "./ActionType";

const initialstate = {
    menuItems: [],
    isLoading: false,
    search: [],
    error: null,
    message: null,
};

export const menuItemReducer = (state = initialstate, action) => {
    switch (action.type) {
        case actiontypes.Create_Menu_Items_Request:
        case actiontypes.Get_Menu_Item_By_Restaurant_Id_Request:
        case actiontypes.Delete_Menu_Item_Request:
        case actiontypes.Search_Menu_Item_Request:
        case actiontypes.Update_Menu_Item_Availability_Request:
            return {
                ...state,
                isLoading: true,
                error: null,
                message: null,
            };
        case actiontypes.Create_Menu_Items_Success:
            console.log("action.payload", action.payload);
            return {
                ...state,
                isLoading: false,
                menuItems: [...state.menuItems, action.payload],
                error: null,
                message: "Food created successfully",
            };
        case actiontypes.Get_Menu_Item_By_Restaurant_Id_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                menuItems: action.payload,
            };
        case actiontypes.Delete_Menu_Item_Success:
            return {
                ...state,
                isLoading: false,
                menuItems: state.menuItems.filter((menuItem) => menuItem.id !== action.payload),
            };

        case actiontypes.Update_Menu_Item_Availability_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                menuItems: state.menuItems.map((menuItem) =>
                    menuItem.id === action.payload.id ? action.payload : menuItem
                ),
            }
        case actiontypes.Search_Menu_Item_Success:
            return {
                ...state,
                isLoading: false,
                error: null,
                search: action.payload,
            };

        case actiontypes.Create_Menu_Items_Failure:
        case actiontypes.Get_Menu_Item_By_Restaurant_Id_Failure:
        case actiontypes.Delete_Menu_Item_Failure:
        case actiontypes.Update_Menu_Item_Availability_Failure:
        case actiontypes.Search_Menu_Item_Failure:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                message: null,
            };
        default:
            return state;
    }
}
export default menuItemReducer;