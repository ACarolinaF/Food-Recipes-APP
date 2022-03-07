import React from "react";
import { Link, NavLink } from "react-router-dom";
import './Recipe.css';


export default function Recipe(props){

    return(
        <div className="principal_div">
                <div className="recipe_div">
                    <div className="img_div">
                        <img className="img" src={props.image} alt="Recipe"/>
                    </div>
                    <div className="info_div">
                        <h2> {props.name}</h2>
                        <h4> <strong>Score:</strong> {props.score} % ????? Points</h4>
                        <h4> <strong>Diet Type:</strong> {props.diets.join(", ")}</h4>
                        <h4> <strong>Cuisines:</strong> {props.cuisines.join(", ")}</h4>
                        <NavLink to={`/recipe/${props.id}`} className="navlink_container"><button className="button_container">More Details</button></NavLink>
                    </div>
                    
                </div>
               
        </div>
    )
}


