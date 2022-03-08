import { GET_RECIPES,
        GET_DETAIL_ID,
        SEARCH_BY_NAME,
        FILTER_BY,
        ORDER_BY,
        POST_RECIPE,
        GET_DIET_TYPES
    } from "../actions/index.js";


const inicialState={
    recipes: [],
    recipesBackup: [],
    recipeById: {},
    recipesByName: [],
    dietTypes:[]
    
    // ---- TERMINAR O FILTER E O ORDER

}


function rootReducer (state = inicialState , action){
    switch(action.type){
        case GET_DIET_TYPES:
            return{
                ...state,
                dietTypes: action.payload
            }
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload,
                recipesBackup: action.payload
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
            let order;

            if(action.payload === 'a-z'){
                order= state.recipesBackup.sort((a,b)=>{
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    else return 0;
                })
            }
            if(action.payload === 'z-a'){
                order= state.recipesBackup.sort((a,b)=>{
                    if(a.name > b.name) return -1;
                    if(a.name < b.name) return 1;
                    else return 0;
                })
            }
            if(action.payload === 'asc'){
                order= state.recipesBackup.sort((a,b)=> a.score - b.score)
            }
            if(action.payload === 'des'){
                order= state.recipesBackup.sort((a,b) => b.score - a.score)
            }
            
            return {...state, recipes: [...order]}

        case POST_RECIPE:
            return{}
        default:
            return state
    }

};

export default rootReducer;