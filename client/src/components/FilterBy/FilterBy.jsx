import React from "react";
import { useDispatch, useSelector } from "react-redux";
import './FilterBy.css';
import { getTypes } from "../../actions";
import { filter, order, filter_diet} from "../../actions";




export default function FilterBy({allDietTypes, handleSelect_filter, handleSelect_filter_diet, handleSelect_order}){

    

    return(
        <div className="initial">
        <div className="principal_div">
            <select className="select_container" onChange={handleSelect_filter} name="" id="">
                <option className="option" value="allrecipes">All Recipes</option> 

                <optgroup className="optionGroup" label="Data Base">
                    <option className="option" value="filter_BD">My Own Recipes</option>
                </optgroup>

                <optgroup className="optionGroup" label="API">
                    <option className="option" value="filter_API">Available on API</option>
                </optgroup>
                
            </select>


            <select className="diets_container" onChange={handleSelect_filter_diet}>
                <option>Diet Types</option>
                <optgroup label="Chose by Diet Types">
                    <option className="option" value="all">All Diet Types</option>
                    {allDietTypes && allDietTypes.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
                </optgroup>
            </select>


            <select className="filters_container" defaultValue="" onChange={handleSelect_order} name="" id="">
                <option value="">Order By</option>
                <optgroup className="optionGroup" label="Alphabetic">
                    <option className="option" value="a-z">A-Z</option>
                    <option className="option" value="z-a">Z-A</option>
                </optgroup>
                <optgroup className="optionGroup" label="Score">
                    <option className="option" value="asc">1 to 100</option>
                    <option className="option" value="des">100 to 1</option>
                </optgroup>

            </select>
        </div>
        </div>
    )


}