const Router = require('express');
const router = Router();
const axios = require('axios');
const {Diet, Recipe} = require('../db');
// require(dotenv).config();
const API_KEY = process.env.API_KEY;



router.get('/', async(req, res)=>{

    let recipe_DB = await Recipe.findAll({
        include: Diet
    })

    let recipe_api= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

    //------------ recipes?name="..."

    if(req.query.name){
        try {

            //let recipe_api_filter = recipe_api.
            
            // axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${req.body.name}&number=100`);

            if(!recipe_api){
                return res.status(204).json(`${req.query.name} - Recipe not Found`);
            }
            
            const recipe_found = recipe_api.data.results.map(r =>{
                return{
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

            const filter_recipe_db = recipe_DB.filter(r => r.name.toLowerCase().includes(req.query.name.toLowerCase()))
            
            const result = [...filter_recipe_db, ...recipe_found.splice(0,9)]

            // res.json(result);

            res.json(`${recipe_api.data.results}`)



        } catch (error) {
            console.log(error)
        }
    }else{
        try {

            let recipe_api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

            const recipe_response = recipe_api.data.results.map(r => {
                return {
                    id: r.id,
                    name: r.title,
                    image: r.image,
                    summary: r.summary,
                    score: r.spoonacularScore,
                    healthScore: r.healthScore,
                    // steps: r.analyzedInstructions[0].steps.map(s => s.step), //.flat(1).join(""),
                    diets: r.diets,
                    dishTypes: r.dishTypes,
                    cuisines: r.cuisines
                }
            })

            res.json(recipe_response);
            
        } catch (error) {
            console.log(error);
        }
    }

})


router.get('/:id', async (req, res, next)=>{

    let {id}=req.params;

    const recipe_id = await axios.get(`https://api.spoonacular.com/recipes/${id}/information/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)

    try {

        // if(id){
            if(id.length >10){ //sera una receta creada porque su ID tendras UUDV
                let recipe_db = await Recipe.findOne({
                    where: {id},
                    include: Diet
                })
                let recipe_response_db = {
                    id: recipe_db.id,
                    name: recipe_db.title,
                    image: recipe_db.image,
                    summary: recipe_db.summary,
                    score: recipe_db.spoonacularScore,
                    healthScore: recipe_db.healthScore,
                    // steps: r.analyzedInstructions[0].steps.map(s => s.step), //.flat(1).join(""),
                    diets: recipe_db.diets,
                    dishTypes: recipe_db.dishTypes,
                    cuisines: recipe_db.cuisines
                }
                return res.json(recipe_response_db)
            }else{
                let recipe_api = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    
                let recipe_response_api ={
                    id: recipe_api.id,
                    name: recipe_api.title,
                    image: recipe_api.image,
                    summary: recipe_api.summary,
                    score: recipe_api.spoonacularScore,
                    healthScore: recipe_api.healthScore,
                    // steps: r.analyzedInstructions[0].steps.map(s => s.step), //.flat(1).join(""),
                    diets: recipe_api.diets,
                    dishTypes: recipe_api.dishTypes,
                    cuisines: recipe_api.cuisines
                }
                return res.json(recipe_response_api);
            }
        // }else{
            return res.send(`Recipe not found, try again`)
        // }
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;