import React from "react";
import loader from "../../img/Loader/loader.gif"

export default function Loading (){
    return(
        <div>
            <img className="loader"src={loader} alt="Loading"/>
            <div className="space_div">-</div>
        </div> 
    )
}

