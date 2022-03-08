import React from "react";
import './CreateRecipe.css';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import NavBar from "../NavBar/NavBar";



export default function CreateRecipe (){

    const [errors, setErrors] = useState({form: 'Must complete the form'})

    const [form, setForm] = useState({
        name: '',
        summary: '',
        score: '',
        healthScore: '',
        steps: [],
        diets: []
    });

    const handleChange = e =>{

        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
        setForm(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
    };

    const validate = form =>{
        let errors ={};

        if(!form.name){
            errors.name = 'Recipe name is required'
        }else if(form.name.length <4){
            errors.name = 'Recipe name must have at leat 4 characters'
        }

        if(!form.summary){
            errors.summary = 'Summary is required'
        }else if(form.summary.length <8){
            errors.summary = 'Summary must have at least 8 characters'
        }

        if(!form.score){
            errors.score = 'Score is required'
        }else if(!/^(?!$)(?:[0-9]{1,2}|100)$/gm.test(form.score)){
            errors.score = 'The score must be a number between 0 and 100'
        }

        if(!form.healthScore){
            errors.healthScore = 'Health Score is required'
        }else if(!/^(?!$)(?:[0-9]{1,2}|100)$/gm.test(form.healthScore)){
            errors.score = 'The Health Score must be a number between 0 and 100'
        }

        if(!form.steps){
            errors.steps = 'Type the sptes of the recipe'
        }
        // else if(){}

        return errors;
    }

    const history = useNavigate();

    const handleSubmit = e =>{
        e.preventDefault()

        validate(form);

        let checkboxsErrors= [];
        if (form.diets.length < 1) checkboxsErrors.push('Diet Types are required');

        if(Object.values(errors).length || checkboxsErrors.length){
            return alert(Object.values(errors).concat(checkboxsErrors).join('\n'));
        }


        axios.post('http://localhost:3001/recipe', form)
            .then(res => console.log(res.data))
        alert(`${form.name} New Recipe Created Successfully`)
        history('/home')
    }



    return(
        <div>
            <NavBar/>

            <div>
                <h2>Create a Recipe</h2>
                <div>
                    <form onSubmit={handleSubmit} onChange={handleChange}>
                        <h4>Name</h4>
                        <p>{errors.name}</p>
                        <input
                            type='text'
                            id='name'
                            value={form.name}
                            placeholder='Name'
                            // onChange={}
                            // className={}
                        />

                        <h4>Summary</h4>
                        <p>{errors.summary}</p>
                        <textarea
                            name='summary'
                            id='summary'
                            value={form.summary}
                            placeholder='Summary'
                            // onChange={}
                            // className={}
                        ></textarea>

                        <h4>Score</h4>
                        <p>{errors.score}</p>
                        <input
                            type='text'
                            id='score'
                            value={form.score}
                            placeholder='Score'
                            // onChange={}
                            // className={}
                        />

                        <h4>Health Score</h4>
                        <p>{errors.healthScore}</p>
                        <input
                            type='text'
                            id='healthScore'
                            value={form.healthScore}
                            placeholder='Health Score'
                            // onChange={}
                            // className={}
                        />

                        <h4>Steps of the Recipe</h4>
                        <p>{errors.steps}</p>
                        <textarea
                            name='steps'
                            id='steps'
                            value={form.steps}
                            placeholder='Steps of the Recipe'
                            // onChange={}
                            // className={}
                        ></textarea>
                        
                        <div>
                            <h4>Diet Types</h4>

                                <input name='gluten free' value='1' type='checkbox' id='gluten free'/>
                                <label>Gluten Free</label>

                                <input name='paleolithic' value='2' type='checkbox' id='paleolithic'/>
                                <label>Paleolithic</label>

                                <input name='vegetarian' value='3' type='checkbox' id='vegetarian'/>
                                <label>Vegetarian</label>

                                <input name='lacto ovo vegetarian' value='4' type='checkbox' id='lacto ovo vegetarian'/>
                                <label>Lacto Ovo Vegetarian</label>

                                <input name='vegan' value='5' type='checkbox' id='vegan'/>
                                <label>Vegan</label>

                                <input name='pescatarian' value='6' type='checkbox' id='pescatarian'/>
                                <label>Pescatarian</label>

                                <input name='paleo' value='7' type='checkbox' id='paleo'/>
                                <label>Paleo</label>

                                <input name='primal' value='8' type='checkbox' id='primal'/>
                                <label>Primal</label>

                                <input name='whole 30' value='9' type='checkbox' id='whole 30'/>
                                <label>Whole 30</label>

                                <input name='fodmap friendly' value='10' type='checkbox' id='fodmap friendly'/>
                                <label>Fodmap Friendly</label>

                                <input name='fruitarian' value='11' type='checkbox' id='fruitarian'/>
                                <label>Fruitarian</label>

                                <input name='dairyFree' value='12' type='checkbox' id='dairyFree'/>
                                <label>DairyFree</label>
                        </div>
                        <div>
                            <button type='submit'>Create this Recipe</button>
                        </div>

                    </form>
                </div>
            </div>
            
            
        </div>
    )
}