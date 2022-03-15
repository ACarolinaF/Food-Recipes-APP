import React from "react";
import './Home.css';
import { useDispatch, useSelector } from "react-redux";
import { getRecipes , getTypes, filter, order, filter_diet} from "../../actions";
import { useEffect } from "react";
import { useState } from "react";

//componentes importados:
import NavBar from '../NavBar/NavBar.jsx';
import SearchBar from "../SearchBar/SearchBar";
import FilterBy from "../FilterBy/FilterBy";
import Pagination from "../Pagination/Pagination";
import RecipeCards from "../RecipeCards/RecipeCards";
import Loading from "../Loading/Loading";



//img
import empty from "../../img/Empty/empty.gif";



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
            const currentCards = allRecipes?.slice(indexOfFirstCard, indexOfLastCard)
        const paginate =(pagenumber) =>{
            setCurrentPage(pagenumber);
        }
        //-----------------//
    
    const [loading, setLoading] = useState(true); 


    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(
            getRecipes()).then(()=> setLoading(false));
        dispatch(
            getTypes()
        )
    }, [dispatch])

    const handleSelect_filter = (e) =>{
        e.preventDefault();
        dispatch(filter(e.target.value))
        setCurrentPage(1)
    }

    const handleSelect_filter_diet =(e)=>{
        e.preventDefault();
        dispatch(filter_diet(e.target.value))
        setCurrentPage(1)
    }

    const handleSelect_order = (e) =>{
        e.preventDefault();
        if(e.target.value === ""){
            dispatch(getRecipes())
        }else{
            dispatch(order(e.target.value))
        }
        setCurrentPage(1);
    }


    return(
        <div className="home_container">
            <div className="nav_filter_container">
            <NavBar/>
            {/* <SearchBar/> */}
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
            
            <div className="recipe_container">
                {
                    loading ?
                        (<Loading/>
                        ):(
                            allRecipes && allRecipes.length > 0 ? (
                                <RecipeCards
                                    recipes={currentCards}
                                />
                            ):(
                                <div>
                                    <h4>Sorry, we can't answer to your request...</h4>
                                    <h4>Try Again!</h4>
                                    <img src={empty} alt="empty"/>
                                    <div className="empty_space">.</div>
                                </div>
                            )
                        )
                }
            </div>
            <div className="last_div">-</div>
        </div>
    )
}