import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './SearchBar.css';


import { searchName } from "../../actions";


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
        <div className="container_principal">
            <input 
                className="input"
                type='text' 
                placeholder="Find your recipe here..." 
                onChange={handleOnChange}
                onKeyDown={handleEnter}
                value={input}
            />

            <button 
                className="find"
                type='submit' 
                onClick={e=>handleSubmit(e)}
            >🔎
            </button>
        </div>
    )
}