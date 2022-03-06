import React from "react";
import './Home.css';
import { useDispatch, useSelector } from "react-redux";
import { getRecipes , getTypes, filter, order} from "../../actions";


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
            getRecipes(),
        )
    }, [dispatch])

    // useEffect(()=>{
    //     dispatch(
    //         getTypes()
    //     )
    // }, [dispatch])

    const handleSelect_filter = (e) =>{
        e.preventdefault()
        dispatch(filter(e.target.value))
        //setcurrentpage!!!
    }

    const handleSelect_order = (e) =>{
        e.preventdefault()
        dispatch(order(e.target.value))
        //setPAge!!!
    }


    return(
        <div className="home_container">
            <NavBar/>
            <SearchBar/>
            <FilterBy
                handleSelect_filter={handleSelect_filter}
                handleSelect_order={handleSelect_order}
            />
            <Pagination/>
            <RecipeCards
                recipes={allRecipes}
            />

        </div>
    )
}