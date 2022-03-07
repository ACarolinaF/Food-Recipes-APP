import React from "react";
import './RecipeDetail.css';


import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails } from "../../actions/index"

//COMPONENTS:
import NavBar from "../NavBar/NavBar.jsx";



export default function RecipeDetail (){

    const {id} = useParams();

    const recipeDetails = useSelector(state=> state.recipeById)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(
            getDetails(id)
        );
    }, [dispatch, id])
    
    return(
        <div className="recipedetails_div">
            <NavBar/>
            <div >
                <h1>Recipe Details</h1>
                

                <h1>{recipeDetails.name}</h1>
                <img src={recipeDetails.image} alt="Recipe Details"/>
                <h4><span>Dish Type(s):</span></h4>
                    <p> {recipeDetails.dishTypes.join(", ")}</p>
                <h4><span>Diet Type(s):</span></h4> 
                    <p>{recipeDetails.diets.join(", ")}</p>
                <h4><span>Summary:</span></h4> 
                    <p>{recipeDetails.summary.replace(/(<([^>]+)>)/gi, "")}</p>
                <h4><span>Score:</span></h4> 
                    <p>{recipeDetails.score}</p>
                <h4><span>Health Score:</span></h4> 
                    <p>{recipeDetails.healthScore}</p>
                <h4><span>Step by step:</span></h4> 
                    <p>{recipeDetails.steps.map(s=>s.map((e,i) => <p><strong>{i+1}</strong> - {e}</p>))}</p>
            </div>
            <NavLink to="/home">
                <button className="back_button">Back</button>
            </NavLink>

        </div>
    )
}