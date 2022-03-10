import React from "react";
import './Home.css';
import { useDispatch, useSelector } from "react-redux";
import { getRecipes , getTypes, filter, order, filter_diet} from "../../actions";


//componentes importados:
import NavBar from '../NavBar/NavBar.jsx';
import SearchBar from "../SearchBar/SearchBar";
import FilterBy from "../FilterBy/FilterBy";
import Pagination from "../Pagination/Pagination";
import RecipeCards from "../RecipeCards/RecipeCards";
import { useEffect } from "react";
import { useState } from "react";


//img
import ups from "../../img/llorando.gif"



export default function Home (){


    let allRecipes = useSelector(state=>state.recipes)

    let allDietTypes = useSelector(state=>state.dietTypes)

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

    const handleSelect_filter = (e) =>{
        // e.preventdefault()
        dispatch(filter(e.target.value))
        setCurrentPage(1)
    }

    const handleSelect_filter_diet =(e)=>{
        dispatch(filter_diet(e.target.value))
        setCurrentPage(1)
    }

    const handleSelect_order = (e) =>{
        // e.preventdefault()
        dispatch(order(e.target.value))
        setCurrentPage(1);
    }


    return(
        <div className="home_container">
            <div>
            <NavBar/>
            <SearchBar/>
            <FilterBy
                allDietTypes={allDietTypes}
                handleSelect_filter={handleSelect_filter}
                handleSelect_filter_diet={handleSelect_filter_diet}
                handleSelect_order={handleSelect_order}
            />
            
            <Pagination
                cardPerPage={cardPerPage}
                totalCards={allRecipes.length}
                paginate={paginate}
                currentPage={currentPage}
            />
            </div>
            
            {/* ??????????????? solo aparece ups si el recipes esta vacio */}
            <div className="recipe_container">
                {allRecipes && (allRecipes.length > 0 ? (
                    <RecipeCards
                    recipes={currentCards}
                    />
                ) : <h1>Uups</h1>)
                }


            </div>

        </div>
    )
}