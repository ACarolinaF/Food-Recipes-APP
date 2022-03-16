import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './SearchBar.css';


import { searchName , getRecipes} from "../../actions";

import loupe from "../../img/SearchBar/loupe.png";


export default function SearchBar(){

    const [input, setInput] = useState("");

    const dispatch = useDispatch();

    const handleOnChange = (e)=>{
        e.preventDefault();
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(input.length <=1){
            alert('To find a Recipe you should here at least 2 characters');
            // setInput("");
            return;
        }

        dispatch(
            searchName(input)
        );
        setInput("")
    }

    const handleRefresh = (e) =>{
        dispatch(
            getRecipes()
        );
    }

    const handleEnter = (e) =>{
        if(e.key === 'Enter'){
            e.preventDefault();
            dispatch(
                searchName(input)
            );
            setInput("");
        }
    }

    return (
        <div className="searBar_container_principal">
            <input 
                className="searchBar_input"
                type='text' 
                placeholder="Find your recipe here..." 
                onChange={handleOnChange}
                onKeyDown={handleEnter}
                value={input}
            />

            <button 
                className="searchBar_go"
                type='submit' 
                onClick={e=>handleSubmit(e)}
            >GO!
            </button>
            <button onClick={handleRefresh}>Refresh</button>
        </div>
    )
}