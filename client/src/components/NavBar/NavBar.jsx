import React from "react";
import './NavBar.css';
import { NavLink } from "react-router-dom";

export default function NavBar(){
    return(
        <div className="navBar_container">
            <NavLink to='/'><button>Intro</button></NavLink>
            <NavLink to='/home'><button>Home</button></NavLink>
            <NavLink to='/createrecipe'><button>Create Recipe</button></NavLink>
            <NavLink to='/about'><button>About</button></NavLink>
        </div>
    )
}