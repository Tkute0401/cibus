import{
    Create_Ingredients_Success,
    Create_Ingredients_Category_Success,
    Get_Ingredients_Category_Success,
    Get_Ingredients,
    Update_Stock
} from "./ActionType";

const initialstate = {
    ingredients: [],
    isLoading: false,
    error: null,
    category: [],
};

const ingredientsReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Get_Ingredients:
            console.log('Reducer called with action:', action);
      console.log('State before update:', state);
            console.log("action.payload", action.payload);
            return {
                ...state,
                ingredients: action.payload,
                isLoading: false,
                error: null,
            };
        case Get_Ingredients_Category_Success:
            console.log("action.payload", action.payload);
            return {
                ...state,
                category: action.payload,
            };
        case Create_Ingredients_Category_Success:
            return {
                ...state,
                category: [...state.category, action.payload],
        };
        case Create_Ingredients_Success:   
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload],
        };
        case Update_Stock:
            return {
                ...state,
                ingredients: state.ingredients.map((ingredient) => 
                    ingredient.id===action.payload.id?action.payload:ingredient),
            };
        default:
            return state;
    }
};

export default ingredientsReducer;