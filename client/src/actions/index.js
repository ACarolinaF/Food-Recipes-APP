import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES'; //trae todas las recetas
export const GET_DETAIL_ID = 'GET_DETAIL_ID'; //trae el detalle de una recet en especifico
export const SEARCH_BY_NAME ='SEARCH_BY_NAME'; //trae una lista que haga correspondencia al pasado por query
export const FILTER_BY = 'FILTER_BY'; //filtro por tipos de dietas
export const ORDER_BY = 'ORDER_BY'; // ordenar alfabeticamente y por score (crescente y decrescente)
export const POST_RECIPE = 'POST_RECIPE'; //post de una receta




export function getRecipes(){
    try {
        return async function(dispatch){
            var response = await axios.get("http://localhost:3001/recipes");
            return dispatch({
                type: GET_RECIPES,
                payload: response.data
            })
        }
    } catch (error) {
        console.log(error)
    }
};

export function getDetails(id){
    try {
        return async function(dispatch){
            var response = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({
                type: GET_DETAIL_ID,
                payload: response.data
            })
        }    
    } catch (error) {
        console.log(error);
    }
};

export function searchName(name){
    try {
        return async function(dispatch){
            var response = await axios.get(`http://localhost:3001/recipes?name=${name}`);
            return dispatch({
                type: SEARCH_BY_NAME,
                payload: response.data
            })
        }
    } catch (error) {
        console.log(error);
    }
};

export function filter(filter_key){
    return {
        type: FILTER_BY,
        payload: filter_key
    }
};

export function order(order_key){
    return {
        type: ORDER_BY,
        payload: order_key
    }
};

export function postRecipe(new_recipe){
    try {
        return async function(dispatch){
            var response = await axios.post(`http://localhost:3001/recipe`);
            return dispatch({
                type: POST_RECIPE,
                payload: response.data
            })
        }
    } catch (error) {
        console.log(error)
    }
}