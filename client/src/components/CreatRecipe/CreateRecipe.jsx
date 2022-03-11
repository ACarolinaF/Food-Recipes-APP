import React, { useEffect } from "react";
import './CreateRecipe.css';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../actions";
import { postRecipe } from "../../actions";


//COMPONENTS
import NavBar from "../NavBar/NavBar";



const validate = form =>{
    let errors ={};

    if(!form.name){
        errors.name = 'Recipe name is required'
    }else if(form.name.length <4){
        errors.name = 'Recipe name must have at least 4 characters'
    }

    if(!form.summary){
        errors.summary = 'Summary is required'
    }else if(form.summary.length <8){
        errors.summary = 'Summary must have at least 8 characters'
    }

    if(!form.score){
        errors.score = 'Score is required'
    }else if(form.score < 0 || form.score > 100){
        errors.score = 'The score must be a number between 0 and 100'
    }

    if(!form.healthScore){
        errors.healthScore = 'Health Score is required'
    }else if(form.healthScore < 0 || form.healthScore > 100){
        errors.healthScore = 'The Health Score must be a number between 0 and 100'
    }

    if(!form.steps){
        errors.steps = 'Type the sptes of the recipe'
    }
    // else if(){}

    return errors;
}



export default function CreateRecipe (){

    const history = useNavigate();
    const dispatch = useDispatch();
    const dietTypes = useSelector((state)=> state.dietTypes)


    useEffect(()=>{
        dispatch(
            getTypes()
        );
    }, [])

    const [errors, setErrors] = useState({})

    const [form, setForm] = useState({
        name: '',
        summary: '',
        score: '',
        healthScore: '',
        steps: [],
        diets: []
    });


    const handleChange = e =>{
        e.preventDefault();

        setForm((prev) =>({
            ...prev,
            [e.target.name]: e.target.value
        }))

        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))

    };

    const handleSelect = e =>{
        e.preventDefault();
        if(!form.diets.includes(e.target.value)){
            setForm({
                ...form,
                diets: [...form.diets, e.target.value]
            })
        }
    }

    const handleDelete = e =>{
        e.preventDefault();
        setForm({
            ...form,
            diets: form.diets.filter((d)=> d !== e.target.name)
        })
    }


    const handleSubmit = e =>{
        e.preventDefault();

        validate(form);

        let dietSelectionError = [];
        if(form.diets.length < 1){
            dietSelectionError.push('Diet Types are requiered')
        }

        if(Object.values(errors).length || dietSelectionError){
            return alert(Object.values(errors).concat(dietSelectionError).join('\n'))
        }

        dispatch(postRecipe(form));

        alert(`${form.name} Recipe Created Successfully`)

        setForm({
            name: '',
            summary: '',
            score: '',
            healthScore: '',
            steps: [],
            diets: []
        })
        history('/home')
    }



    return(
        <div>
            <NavBar/>

            <div>
                <h2>Create a Recipe</h2>
                <div>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        
                        
                        <label><strong>Name:</strong></label><br/>
                        <input 
                            placeholder="Name" type="text" id='name' name='name' 
                            value={form.name} onChange={(e)=>handleChange(e)} 
                            autoComplete='off'/><br />
                        {errors.name && <p>{errors.name}</p>}

                        <label><strong>Summary:</strong></label><br/>
                        <textarea placeholder="Summary" id='summary' name='summary' 
                            cols='40' rows='10' 
                            value={form.summary} onChange={(e)=>handleChange(e)} 
                            autoComplete='off'/><br/>
                        {errors.summary && <p>{errors.summary}</p>}

                        <label><strong>Score:</strong></label><br/>
                        <input placeholder="Score" id='score' name='score' type='number'
                            value={form.score} onChange={(e)=>handleChange(e)}
                            autoComplete='off'/><br/>
                        {errors.score && <p>{errors.score}</p>}

                        <label htmlFor="healthScore"><strong>Health Score:</strong></label><br/>
                        <input placeholder="healthScore" id='healthScore' name='healthScore' type='number' 
                            value={form.healthScore} onChange={(e)=>handleChange(e)}
                            autoComplete='off'/><br/>
                        {errors.healthScore && <p>{errors.healthScore}</p>}

                        <label htmlFor="steps"><strong>Steps:</strong></label><br/>
                        <textarea placeholder="Steps" id='steps' name='steps' type='text' 
                            cols='40' rows='10'
                            value={form.steps} onChange={(e)=>handleChange(e)}
                            autoComplete='off'/><br/>
                        {errors.steps && <p>{errors.steps}</p>}

                        <label><strong>Select the Diet Types:</strong></label>
                        <select onChange={(e)=>handleSelect(e)}>
                            {dietTypes.map((e)=>(
                            <option key={e.name} value={e.name}>{e.name}</option>
                            ))}
                        </select>

                        <div>
                            {form.diets.map((e)=>(
                                <div key={e}>
                                    {e}
                                    <button name={e} onClick={(e)=>handleDelete(e)}>X</button>
                                </div>
                            ))}
                        </div>

                        <div>
                            <button type='submit'>Create</button>
                        </div>


                    </form>
                </div>
            </div>
            
            
        </div>
    )
}