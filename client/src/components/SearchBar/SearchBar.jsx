import React, { useState } from "react";
import { useDispatch } from "react-redux";
import './SearchBar.css';


import { searchName } from "../../actions";


export default function SearchBar(){

    const [input, setInput] = useState("");

    const dispatch = useDispatch();

    const handleOnChange = (e)=>{
        setInput(e.target.value.toLowerCase())
    }

    const handleOnClick = (e) => {
        // e.preventdefault();
        dispatch(
            searchName(input)
        );
        // setInput("")
    }

    return (
        <div>
            <form onSubmit={handleOnClick}>
                <input className="input"
                    name="search"
                    placeholder="Find your recipe here..."
                    onChange={handleOnChange}
                    value={input}
                ></input>
            </form>
        </div>
    )
}