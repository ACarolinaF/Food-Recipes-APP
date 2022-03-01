import { GET_RECIPES } from "../actions/index.js";

const inicialState={
    recipes: []

}


function rootReducer (state = inicialState , action){
    switch(action.type){
        case GET_RECIPES:
            return{
                ...state,
                recipes: action.payload
            }
        default:
            return state
    }

};

export default rootReducer;