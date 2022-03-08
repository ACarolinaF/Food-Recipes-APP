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
    

    // css text-transform first letter capitalize
    
    return(
        <div className="recipedetails_div">
            <NavBar/>
            <div className="details_container">
                <h1 className="title_principal_container">{recipeDetails.name}</h1>
                <img className="img_container" src={recipeDetails.image && recipeDetails.image} alt="Recipe Details"/>
                <div className="img_down">.          .</div>
                <h2 className="titles_container"><span>Dish Type(s):</span></h2>
                    <p className="info_container"> {recipeDetails.dishTypes && recipeDetails.dishTypes.join(", ")}</p>
                <h2 className="titles_container"><span>Diet Type(s):</span></h2> 
                    <p className="info_container">{recipeDetails.diets && recipeDetails.diets.join(", ")}</p>
                <h2 className="titles_container"><span>Summary:</span></h2> 
                    <p className="info_container_tx">{recipeDetails.summary && recipeDetails.summary.replace(/(<([^>]+)>)/gi, "")}</p>
                <h2 className="titles_container"><span>Score:</span></h2> 
                    <p className="info_container">{recipeDetails.score && recipeDetails.score}</p>
                <h2 className="titles_container"><span>Health Score:</span></h2> 
                    <p className="info_container">{recipeDetails.healthScore && recipeDetails.healthScore}</p>
                <h2 className="titles_container"><span>Step by step:</span></h2> 
                    <p className="info_container_tx">{recipeDetails.steps && recipeDetails.steps.map(s=>s.map((e,i) => <p><strong>{i+1}</strong> - {e}</p>))}</p>
            </div>
            <NavLink to="/home">
                <button className="back_button">Back</button>
            </NavLink>

        </div>
    )
}