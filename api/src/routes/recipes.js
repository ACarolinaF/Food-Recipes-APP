const Router = require('express');
const router = Router();
const axios = require('axios');
const {Diet, Recipe} = require('../db');
// require(dotenv).config();
const API_KEY = process.env.API_KEY;



// router.get('/', async(req, res)=>{

//     let recipe_DB = await Recipe.findAll({
//         include: Diet
//     })

//     let recipe_api= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

//     //------------ recipes?name="..."

//     if(req.query.name){
//         try {

//             //let recipe_api_filter = recipe_api.
            
//             // axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${req.body.name}&number=100`);

//             if(!recipe_api){
//                 return res.status(204).json(`${req.query.name} - Recipe not Found`);
//             }
            
//             const recipe_found = recipe_api.data.results.map(r =>{
//                 return{
//                     id: r.id,
//                     name: r.title,
//                     image: r.image,
//                     summary: r.summary,
//                     score: r.spoonacularScore,
//                     healthScore: r.healthScore,
//                     // steps: r.analyzedInstructions[0].steps.map(s => s.step).flat(1).join(""),
//                     diets: r.diets,
//                     dishTypes: r.dishTypes,
//                     cuisines: r.cuisines
//                 }
//             })

//             const filter_recipe_db = recipe_DB.filter(r => r.name.toLowerCase().includes(req.query.name.toLowerCase()))
            
//             const result = [...filter_recipe_db, ...recipe_found.splice(0,9)]

//             // res.json(result);

//             res.json(`${recipe_api.data.results}`)



//         } catch (error) {
//             console.log(error)
//         }
//     }else{
//         try {

//             let recipe_api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

//             const recipe_response = recipe_api.data.results.map(r => {
//                 return {
//                     id: r.id,
//                     name: r.title,
//                     image: r.image,
//                     summary: r.summary,
//                     score: r.spoonacularScore,
//                     healthScore: r.healthScore,
//                     // steps: r.analyzedInstructions[0].steps.map(s => s.step), //.flat(1).join(""),
//                     diets: r.diets,
//                     dishTypes: r.dishTypes,
//                     cuisines: r.cuisines
//                 }
//             })

//             res.json(recipe_response);
            
//         } catch (error) {
//             console.log(error);
//         }
//     }

// })









//-------------- GET BY ID ----------------------------------------------------------

router.get('/:id', async (req, res, next)=>{
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
                name: response.data.name,
                image: response.data.image,
                summary: response.data.summary,
                score: response.data.spoonacularScore,
                healthScore: response.data.healthScore,
                steps: response.data.analyzedInstructions.map(instructions =>{
                    return instructions.steps.map(s => s.step)
                }), //.flat(),
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