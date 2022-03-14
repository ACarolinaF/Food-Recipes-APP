import React from "react";
import { NavLink } from "react-router-dom";
import './Recipe.css';
import default_img from '../../img/Default/default.jpg'


export default function Recipe(props){

    return(
        <div className="principal_div_recipe">
            {props.id && (
            <NavLink to={`/recipe/${props.id}`} className="navlink_container">
                <div className="recipe_div">
                    <div className="img_div">
                        {props.image? (
                            <img className="img" src={props.image} alt="Recipe"/>
                            ):(
                            <img className="img" src={default_img} alt="Recipe"/>
                            )}   
                    </div>
                    <div className="info_div">
                        <h2> {props.name}</h2>
                        <h4> <strong>Diet Type:</strong> {props.diets.join(", ")}</h4>
                        <h4> <strong>Score:</strong> {props.score} %</h4>
                        {/* <h4> <strong>Cuisines:</strong> {props.cuisines.join(", ")}</h4> */}
                    </div>
                </div>
            </NavLink>
            )}






               
        </div>
    )
}


