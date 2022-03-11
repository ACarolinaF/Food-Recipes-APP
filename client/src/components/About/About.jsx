import React from "react";
import './About.css';
import insta from '../../img/socialMedia/insta.png'
import face from '../../img/socialMedia/face.png'
import linkedin from '../../img/socialMedia/linkedin.png'
import gitHub from '../../img/socialMedia/gitHub.png'

//COMPONENTS:
import NavBar from "../NavBar/NavBar";

export default function About (){
    return (
        
        <div className="about_container">
            <NavBar />
            <h2 className="title_container"> Individual Project - Henry Bootcamp</h2>
            <h3 className="name_container">Carolina Fernandes</h3>
            <h2 className="contact_container">Contact me</h2>


    <div class="icons">
        <a href="https://www.facebook.com/carolina.fernandes.5851" target="_blank">
           <div class="layer">
              <span></span>
              <span></span>
              <span></span>
              <span><img  className="img_social" src={face}/></span>
              <span class="fab fa-facebook-f"></span>
           </div>
           <div class="text">
              Facebook
           </div>
        </a>
        <a href="https://www.linkedin.com/in/ana-carolina-fernandes-8b2a4221b" target="_blank">
           <div class="layer">
              <span></span>
              <span></span>
              <span></span>
              <span><img  className="img_social" src={linkedin}/></span>
              <span class="fab fa-instagram"></span>
           </div>
           <div class="text">
           Linkedin
           </div>
        </a>
        <a href="https://www.instagram.com/a.carolina.fer/" target="_blank">
           <div class="layer">
              <span></span>
              <span></span>
              <span></span>
              <span><img  className="img_social_insta" src={insta}/></span>
              <span class="fab fa-linkedin-in"></span>
           </div>
           <div class="text">
            Instagram
           </div>
        </a>
        <a href="https://github.com/ACarolinaF" target="_blank">
           <div class="layer">
              <span></span>
              <span></span>
              <span></span>
              <span><img  className="img_social_gitHub" src={gitHub}/></span>
              <span class="fab fa-github-in"></span>
           </div>
           <div class="text">
            GitHub
           </div>
        </a>
     </div>





        </div>
    )
}