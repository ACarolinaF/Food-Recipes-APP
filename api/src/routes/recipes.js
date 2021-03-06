const Router = require('express');
const router = Router();
const axios = require('axios');
const {Diet, Recipe} = require('../db');
// require(dotenv).config();
const API_KEY = process.env.API_KEY;



router.get('/', async(req, res)=>{

    //------------ recipes?name="..."-----------------------------------------------------

    if(req.query.name){
        try {

            let recipes_DB = await Recipe.findAll({
                include:{
                    model: Diet,
                    attributes: ['name'],
                    through:{
                        attributes: []
                    }
                }
            })
        
            let recipe_api= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        
            let api_results = recipe_api.data.results.map(r =>{
                return {
                    id: r.id,
                    name: r.title,
                    image: r.image,
                    summary: r.summary,
                    score: r.spoonacularScore,
                    healthScore: r.healthScore,
                    steps: r.analyzedInstructions.map(a=> a.steps.map(b=> b.step)).flat(1).join(""),
                    diets: r.diets,
                    dishTypes: r.dishTypes,
                    cuisines: r.cuisines
                }
            })

            const all_recipes = recipes_DB.concat(api_results);

            const resp = [];

            all_recipes.map(r => { 
                if(r.name.toLowerCase().includes(req.query.name.toLowerCase())){
                    resp.push(
                        {
                            id: r.id,
                            name: r.name,
                            image: r.image,
                            summary: r.summary,
                            score: r.score,
                            healthScore: r.healthScore,
                            //O SEARCH DEIXA DE FUNCIONAR! ATENÇÃO!
                            // steps: r.analyzedInstructions.map(a=> a.steps.map(b=> b.step)).flat(1).join(""),
                            diets: r.diets,
                            dishTypes: r.dishTypes,
                            cuisines: r.cuisines
                        }
                    )
                }
            });

            res.json(resp);

        } catch (error) {
            console.log(error)
        }
    }else{
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
                    // steps: r.analyzedInstructions[0].steps.map(s => s.step).flat(1).join(""),
                    diets: r.diets,
                    dishTypes: r.dishTypes,
                    cuisines: r.cuisines
                }
            })

            let final_res = [...response_recipes_DB, ...recipe_response]
            res.json(final_res);
            
        } catch (error) {
            console.log(error);
        }
    }

})









//-------------- GET BY ID ----------------------------------------------------------------

router.get('/:id', async (req, res)=>{
    let{id} = req.params;

    if(id.includes('-')){
        const recipe_db = await Recipe.findOne({
            where:{id: id}, 
            include: Diet
        })

        return res.json(recipe_db);
    }else{

        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
            
            return res.json({
                id: response.data.id,
                name: response.data.title,
                image: response.data.image,
                summary: response.data.summary,
                score: response.data.spoonacularScore,
                healthScore: response.data.healthScore,
                steps: response.data.analyzedInstructions[0].steps?.map(s=> {return{number: s.number, step: s.step}}),
                diets: response.data.diets,
                dishTypes: response.data.dishTypes,
                cuisines: response.data.cuisines

            })

        } catch (error) {
            console.log(error);
        }
    }
})


module.exports = router;