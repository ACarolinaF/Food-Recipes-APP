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
import { useState } from "react";



export default function Home (){


    let allRecipes = useSelector(state=>state.recipes)

        //----PAGINATION----//
        const [currentPage, setCurrentPage] = useState(1);
        const cardPerPage = 9;
                //index of pagination
                const indexOfLastCard = currentPage * cardPerPage;
                const indexOfFirstCard = indexOfLastCard - cardPerPage;
            //renderized cards
            const currentCards = allRecipes.slice(indexOfFirstCard, indexOfLastCard)
        const paginate =(pagenumber) =>{
            setCurrentPage(pagenumber);
        }
        //-----------------//

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(
            getRecipes()
        )
        dispatch(
            getTypes()
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
        setCurrentPage(1)
    }

    const handleSelect_order = (e) =>{
        // e.preventdefault()
        dispatch(order(e.target.value))
        setCurrentPage(1);
    }


    return(
        <div className="home_container">
            <NavBar/>
            <SearchBar/>
            <FilterBy
                handleSelect_filter={handleSelect_filter}
                handleSelect_order={handleSelect_order}
            />
            <Pagination
                cardPerPage={cardPerPage}
                totalCards={allRecipes.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            <div className="recipe_container">
            <RecipeCards
                recipes={currentCards}
            />
            </div>

        </div>
    )
}