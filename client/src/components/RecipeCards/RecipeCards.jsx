import React from "react";
import './RecipeCards.css';
import { useState } from "react";

import Recipe from '../Recipe/Recipe'


export default function RecipeCards({recipes}){

    

    return(
        <div className="cards">
            {
                recipes.map((r)=>(
                    <Recipe
                        id={r.id}
                        name={r.name}
                        image={r.image}
                        sumary={r.sumary}
                        score={r.score}
                        healthScore={r.healthScore}
                        // steps={r.steps}
                        diets={r.diets}
                        dishTypes={r.dishTypes}
                        cuisines={r.cuisines}

                    />
                ))
            }
        </div>
    )
}

