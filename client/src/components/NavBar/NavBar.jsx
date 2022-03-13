import React from "react";
import './NavBar.css';
import { NavLink } from "react-router-dom";

import SearchBar from "../SearchBar/SearchBar";

export default function NavBar(){
    return(
        <div className="navBar_container">
            <NavLink to='/'><button className="navlink">Intro</button></NavLink>
            <NavLink to='/home'><button className="navlink">Home</button></NavLink>
            <NavLink to='/createrecipe'><button className="navlink">Create Recipe</button></NavLink>
            <NavLink to='/about'><button className="navlink">About</button></NavLink>
            <SearchBar/>
        </div>
    )
}