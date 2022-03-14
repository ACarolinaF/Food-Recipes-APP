import React from "react";
import loader from "../../img/Loader/loader.gif"
import './Loading.css';

export default function Loading (){
    return(
        <div>
            <img className="loader"src={loader} alt="Loading"/>
            <div className="loader_space">-</div>
            <div className="loader_last_div">.</div>
        </div> 
    )
}

