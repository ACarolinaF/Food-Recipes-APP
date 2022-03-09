import React from "react";
import { useDispatch } from "react-redux";
import './FilterBy.css';
import { getTypes } from "../../actions";
import { filter, order } from "../../actions";




export default function FilterBy({handleSelect_filter, handleSelect_order}){

    const dispatch = useDispatch();
    
    const handleTypes = (e) =>{
        dispatch(getTypes())
    }

    const handleSelect = (e) =>{
        filter(e.target.value)
    }

    const handleSelect2 = (e) =>{
        order(e.target.value)
    }

    return(
        <div className="filter_container">
            <select className="select_container" onChange={handleSelect_filter} name="" id="">
                <option className="option" value="allrecipes">All Recipes</option> 

                <optgroup className="optionGroup" label="Data Base">
                    <option className="option" value="filter_BD">My Own Recipes</option>
                </optgroup>

                <optgroup className="optionGroup" label="API">
                    <option className="option" value="filter_API">Available on API</option>
                </optgroup>
            </select>

            <select className="diets_container" onChange={handleTypes}>
                <optgroup className="optionGroup" label="Chose by Diet Types">
                    <option className="option" value="gluten free">Gluten Free</option>
                    <option className="option" value="paleolithic">Paleolithic</option>
                    <option className="option" value="vegetarian">Vegetarian</option>
                    <option className="option" value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
                    <option className="option" value="vegan">Vegan</option>
                    <option className="option" value="pescatarian">Pescatarian</option>
                    <option className="option" value="paleo">Paleo</option>
                    <option className="option" value="primal">Primal</option>
                    <option className="option" value="whole 30">Whole 30</option>
                    <option className="option" value="fodmap friendly">Fodmap Friendly</option>
                    <option className="option" value="fruitarian">Fruitarian</option>
                    <option className="option" value="dairyFree">DairyFree</option>
                </optgroup>
            </select>

            <select className="filters_container" defaultValue="" onChange={handleSelect_order} name="" id="">
                <option>Order By</option>
                <optgroup className="optionGroup" label="Alphabetic">
                    <option className="option" value="a-z">A-Z</option>
                    <option className="option" value="z-a">Z-A</option>
                </optgroup>
                <optgroup className="optionGroup" label="Score">
                    <option className="option" value="asc">Score 1-100</option>
                    <option className="option" value="des">Score 100-1</option>
                </optgroup>

            </select>
        </div>
    )


}