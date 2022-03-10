const Router = require('express');
const router = Router();
const axios = require ('axios');
const {Recipe, Diet} = require('../db');


router.post('/', async (req, res)=>{
    let{
        name,
        image,
        summary,
        score,
        healthScore,
        // steps,
        diets,
        // dishTypes,
        // cuisines
    } = req.body;

    try {
        let new_recipe = await Recipe.create({
            name: name,
            image: image,
            summary: summary,
            score: score,
            healthScore: healthScore,
            // steps: steps,
            // diets: diets,
            // dishTypes: dishTypes,
            // cuisines: cuisines
        })
        let diet_db = await Diet.findAll({
            where: {name: diets}
        })
        new_recipe.addDiet(diet_db);

        res.send(new_recipe);
        
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;


