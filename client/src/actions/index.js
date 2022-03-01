import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES'; //trae todas las recetas




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
}