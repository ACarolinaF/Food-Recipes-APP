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
            </div>
            <NavLink to="/home">
                <button className="back_button">Back</button>
            </NavLink>

        </div>
    )
}