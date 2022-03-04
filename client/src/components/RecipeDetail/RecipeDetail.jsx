import React from "react";
import './RecipeDetail.css';


import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails } from "../../actions/index"

//COMPONENTS:
import NavBar from "../NavBar/NavBar.jsx";



export default function RecipeDetail (){

    const {id} = useParams;

    const recipeDetails = useSelector(state=> state.recipeById)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(
            getDetails(id)
        )
    }, [])
    
    return(
        <div className="recipedetails_div">
            <NavBar/>
            <div >
                <h1>Recipe Details</h1>
                {recipeDetails.name}
            </div>

        </div>
    )
}