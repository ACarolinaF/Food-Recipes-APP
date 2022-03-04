import React from "react";
import { Link } from "react-router-dom";
import './Recipe.css';


export default function Recipe(props){

    return(
        <div className="principal_div">
            <Link to={`/recipe/${props.id}`}>
                <div className="recipe_div">
                    <h4> ID: {props.id}</h4>
                    <h4> NAME: {props.name}</h4>
                    <img className="img" src={props.image} alt="Recipe"/>
                    <h4> SUMMARY: {props.summary}</h4>
                    <h4> SCORE: {props.score}</h4>
                    <h4> HEALTH SCORE: {props.healthScore}</h4>
                    <h4> STEPS: {props.steps}</h4>
                    <h4> DIET: {props.diets}</h4>
                    <h4> DISH TYPES: {props.dishTypes}</h4>
                    <h4> CUISINES: {props.cuisines}</h4>
                </div>
            </Link>
        </div>
    )
}


