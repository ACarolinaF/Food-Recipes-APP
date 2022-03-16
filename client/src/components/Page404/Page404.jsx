
import React from "react";
import './Page404.css';
import { NavLink} from 'react-router-dom';
import Page404 from '../../img/Page404/404.gif';



export default function Landing(){
    return(
    <div>
        <img src={Page404} alt="Path not found"/>
        <h3 className="lost_404_h3">What are you doing here?</h3>
        <NavLink to="/home"><button className="lost_404_btn"> Come back Home </button></NavLink>
    </div>
    )
}