import React from "react";
import './Landing.css';
import {Link} from 'react-router-dom';

export default function Landing(){
    return(
    <div className="landing_div">
        {/* <h1>Welcome</h1> */}
        <Link to='/home'><button className="landing_button">Let's Cook</button></Link>
    </div>
    )
}