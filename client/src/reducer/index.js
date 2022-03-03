import { GET_RECIPES,
        GET_DETAIL_ID,
        SEARCH_BY_NAME,
        FILTER_BY,
        ORDER_BY,
        POST_RECIPE
    } from "../actions/index.js";


const inicialState={
    recipes: [],
    recipeById: {},
    recipesByName: []
    
    // ---- TERMINAR O FILTER E O ORDER

}


function rootReducer (state = inicialState , action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload
            }
        case GET_DETAIL_ID:
            return {
                ...state,
                recipeById: action.payload
            }
        case SEARCH_BY_NAME:
            return{
                ...state,
                recipesByName: action.payload
            }
        case FILTER_BY:
            return {

            }
        case ORDER_BY:
            return{

            }
        case POST_RECIPE:
            return{}
        default:
            return state
    }

};

export default rootReducer;