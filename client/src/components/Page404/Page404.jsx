
import React from "react";
import './Page404.css';
import { NavLink} from 'react-router-dom';



export default function Landing(){
    return(
    <div>
        <h3>QUE HACES AQUI?????</h3>
        <NavLink to="/home"><button> Anda a tu casa </button></NavLink>
    </div>
    )
}