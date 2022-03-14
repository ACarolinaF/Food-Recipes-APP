import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './SearchBar.css';


import { searchName } from "../../actions";

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
        dispatch(
            searchName(input)
        );
        setInput("")
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
        </div>
    )
}