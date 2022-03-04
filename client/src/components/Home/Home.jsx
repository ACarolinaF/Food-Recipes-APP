import React from "react";
import './Home.css';
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../actions";


//componentes importados:
import NavBar from '../NavBar/NavBar.jsx';
import SearchBar from "../SearchBar/SearchBar";
import FilterBy from "../FilterBy/FilterBy";
import Pagination from "../Pagination/Pagination";
import RecipeCards from "../RecipeCards/RecipeCards";
import { useEffect } from "react";



export default function Home (){

    let allRecipes = useSelector(state=>state.recipes)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(
            getRecipes()
        )
    }, [dispatch])



    return(
        <div className="home_container">
            <NavBar/>
            <SearchBar/>
            <FilterBy/>
            <Pagination/>
            <RecipeCards
                recipes={allRecipes}
            />

        </div>
    )
}