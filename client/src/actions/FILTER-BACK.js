

//RUTAS ------------------

router.get('/filter_by_diet/:diet', async (req, res)=>{

    try {
        let response_recipes_DB = await Recipe.findAll({
            include: Diet
        })

        let recipe_api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

        const recipe_response = recipe_api.data.results.map(r => {
            return {
                id: r.id,
                name: r.title,
                image: r.image,
                summary: r.summary,
                score: r.spoonacularScore,
                healthScore: r.healthScore,
                diets: r.diets,
                dishTypes: r.dishTypes,
                cuisines: r.cuisines
            }
        })

        let final_res = [...response_recipes_DB, ...recipe_response];

        let {diet} =req.params;
        
        let filter = final_res.filter(r=> r.diets.includes(diet))

        res.json(filter);
        
    } catch (error) {
        console.log(error);
    }

})




//ACTION--------

export function getDetails(diet){
    try {
        return async function(dispatch){
            var response = await axios.get(`http://localhost:3001/recipes/filter_by_diet/${diet}`);
            return dispatch({
                type: FILTER_BY,
                payload: response.data
            })
        }    
    } catch (error) {
        console.log(error);
    }
};

//REDUCER-------
case FILTER_BY:
    return{
        ...state,
        recipes: action.payload
    }


//