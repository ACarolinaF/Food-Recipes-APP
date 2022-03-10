import { GET_RECIPES,
        GET_DETAIL_ID,
        SEARCH_BY_NAME,
        FILTER_BY,
        FILTER_BY_DIETS,
        ORDER_BY,
        POST_RECIPE,
        GET_DIET_TYPES
    } from "../actions/index.js";


const inicialState={
    recipes: [],
    recipesBackup: [],
    recipeById: {},
    recipesByName: [],
    dietTypes:[],
    orderBy:[]
    
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
                recipesBackup: action.payload,
                orderBy: action.payload
            }
        case GET_DETAIL_ID:
            return {
                ...state,
                recipeById: action.payload
            }
        case SEARCH_BY_NAME:
            return{
                ...state,
                recipes: action.payload
            }
        case FILTER_BY:
            if(action.payload === 'allrecipes'){
                return {...state}
            }

            if(action.payload === 'filter_BD'){
                return {
                    ...state,
                    recipes: state.orderBy.filter((r)=> (typeof r.id) === 'string')
                }
            }

            if(action.payload === 'filter_API'){
                return{
                    ...state,
                    recipes: state.orderBy.filter((r)=> (typeof r.id) === 'number')
                    //si son un numero es porque pertenencen a la API
                }
            }

        
        case FILTER_BY_DIETS:

            const allrecipes = state.recipes
            const typeFiltered = action.payload === 'all' ? allrecipes :
                allrecipes.filter(e => e.diets.include(action.payload));

            return {
                ...state,
                recipes: typeFiltered
            }


            // const recipes = state.recipes
            // const dietFiltered = recipes.diets.map(r=> r.includes(action.paylod))

            // return{
            //     ...state,
            //     recipes: dietFiltered
            // }
                


        case ORDER_BY:
            let order;

            if(action.payload === 'a-z'){
                order= state.orderBy.sort((a,b)=>{
                    if(a.name > b.name) return 1;
                    if(a.name < b.name) return -1;
                    else return 0;
                })
            }
            if(action.payload === 'z-a'){
                order= state.orderBy.sort((a,b)=>{
                    if(a.name > b.name) return -1;
                    if(a.name < b.name) return 1;
                    else return 0;
                })
            }
            if(action.payload === 'asc'){
                order= state.orderBy.sort((a,b)=> a.score - b.score)
            }
            if(action.payload === 'des'){
                order= state.orderBy.sort((a,b) => b.score - a.score)
            }
            
            return {...state, recipes: [...order]}

        case POST_RECIPE:
            return{}
        default:
            return state
    }

};

export default rootReducer;