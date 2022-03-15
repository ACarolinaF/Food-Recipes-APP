import React, { useEffect } from "react";
import './CreateRecipe.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../actions";
import { postRecipe } from "../../actions";


//COMPONENTS
import NavBar from "../NavBar/NavBar";



const validate = form => {
    let URL = /^(www)?.+\.[a-z]{2,6}(\.[a-z]{2,6})?.+\.[a-z]{2,4}$/;
    let errors = {};

    if (!form.name) {
        errors.name = 'Recipe name is required'
    } else if (form.name.length < 4) {
        errors.name = 'Recipe name must have at least 4 characters'
    }

    if (form.image) {
        if (!URL.test(form.image)) {
            errors.image = "The image uploaded must be an URL";
        }
    }

    if (!form.summary) {
        errors.summary = 'Summary is required'
    } else if (form.summary.length < 8) {
        errors.summary = 'Summary must have at least 8 characters'
    }

    if (!form.score) {
        errors.score = 'Score is required'
    } else if (form.score < 0 || form.score > 100) {
        errors.score = 'The score must be a number between 0 and 100'
    }

    if (!form.healthScore) {
        errors.healthScore = 'Health Score is required'
    } else if (form.healthScore < 0 || form.healthScore > 100) {
        errors.healthScore = 'The Health Score must be a number between 0 and 100'
    }

    if (!form.steps) {
        errors.steps = 'Type the steps of the recipe'
    }

    return errors;
}



export default function CreateRecipe() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dietTypes = useSelector((state) => state.dietTypes)


    useEffect(() => {
        dispatch(
            getTypes()
        );
    }, [])

    const [errors, setErrors] = useState({})

    const [form, setForm] = useState({
        name: '',
        image: '',
        summary: '',
        score: '',
        healthScore: '',
        steps: '',
        diets: []
    });


    const handleChange = e => {
        e.preventDefault();

        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))

        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))

    };

    const handleChangeSteps = e => {
        e.preventDefault();
        setForm((prev) => ({
            ...prev,
            steps: [[e.target.name]]
        }))
        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelect = e => {
        e.preventDefault();
        if (!form.diets.includes(e.target.value)) {
            setForm({
                ...form,
                diets: [...form.diets, e.target.value]
            })
        }
    }

    const handleDelete = e => {
        e.preventDefault();
        setForm({
            ...form,
            diets: form.diets.filter((d) => d !== e.target.name)
        })
    }


    const handleStepsOnChange = e =>{
        e.preventDefault();

        let stepsArray = form.steps;
        stepsArray[0]=e.target.value;
    }

    const handleAddStep = e =>{
        e.preventDefault()
        let new_steps = form.steps;
        new_steps = new_steps[0].push(e.target.value);
        setForm({
            ...form,
            steps: new_steps
        })
    }

    const handleRemoveStep = e =>{
        e.preventDefault()
        let newSteps = form.steps;
        if(newSteps[0].length > 1) newSteps.pop();
        setForm({
            ...form,
            steps: newSteps
        });
    }



    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validate(form));

        let dietSelectionError = [];
        if (form.diets.length < 1) {
            dietSelectionError.push('Diet Types are required')
        }

        if(Object.values(errors).length || dietSelectionError.length){
            return alert(Object.values(errors).concat(dietSelectionError).join('\n'))
        }

        dispatch(postRecipe(form));

        alert(`${form.name} Recipe Created Successfully`);
        navigate('/home')

        setForm({
            name: '',
            image: '',
            summary: '',
            score: '',
            healthScore: '',
            // steps: '',
            diets: []
        })

    }



    return (
        <div className="a_div">
            <div className="navBar_div_create">
                <NavBar />
            </div>

            <div className="principal_div">
                <h2 className="title">Create a Recipe</h2>
                <div>
                    <form className="form" onSubmit={(e) => handleSubmit(e)}>


                        <h3 className="h3-name"><strong>Name:</strong></h3><br />
                        <input
                            className="input_name"
                            placeholder="Name" type="text" id='name' name='name'
                            value={form.name} onChange={(e) => handleChange(e)}
                            autoComplete='off' /><br />
                        {errors.name && <p className="error">{errors.name}</p>}

                        <h3 className="h3_image">Image:</h3>
                        <input
                            className="input_image"
                            placeholder="Image" type="text" id='image' name='image'
                            value={form.image} onChange={(e) => handleChange(e)}
                            autoComplete='off'
                        />
                        {errors.image && <p className="error">{errors.image}</p>}

                        <h3 className="h3-summary"><strong>Summary:</strong></h3><br />
                        <textarea
                            className="input_summary"
                            placeholder="Summary" id='summary' name='summary'
                            cols='40' rows='10'
                            value={form.summary} onChange={(e) => handleChange(e)}
                            autoComplete='off' /><br />
                        {errors.summary && <p className="error">{errors.summary}</p>}

                        <h3 className="h3_score"><strong>Score:</strong></h3><br />
                        <input
                            className="input_score"
                            placeholder="Score" id='score' name='score' type='number'
                            value={form.score} onChange={(e) => handleChange(e)}
                            autoComplete='off' /><br />
                        {errors.score && <p className="error">{errors.score}</p>}

                        <h3 className="h3_hScore"><strong>Health Score:</strong></h3><br />
                        <input
                            className="input_hScore"
                            placeholder="healthScore" id='healthScore' name='healthScore' type='number'
                            value={form.healthScore} onChange={(e) => handleChange(e)}
                            autoComplete='off' /><br />
                        {errors.healthScore && <p className="error">{errors.healthScore}</p>}

                        <h3 className="h3_steps"><strong>Steps:</strong></h3><br />
                        <textarea
                            className="input_steps"
                            placeholder="Steps" id='steps' name='steps'
                            cols='40' rows='10'
                            value={form.steps} onChange={(e) => handleChange(e)}
                            autoComplete='off' /><br />
                        {errors.steps && <p className="error">{errors.steps}</p>}


                        {/* <h3>Steps:</h3>
                        <button onClick={handleAddStep}>+</button>
                        <button onClick={handleRemoveStep}>-</button>
                        <ol>
                        <h3>{form.steps[0].map(s=>(
                            <li key={s}>{s}</li>
                        ))}</h3>
                        </ol>
                        <ol>
                            {form.steps[0].map( step => (
                                <li key={step}>
                                    <input type='text' id={step} name='Instructions' autoComplete="off" onChange={handleStepsOnChange}/>
                                </li>
                            ))}
                        </ol> */}


                        <h3 className="h3_dTypes"><strong>Select the Diet Types:</strong></h3>
                        <select className='select_diets' onChange={(e) => handleSelect(e)}>
                            {dietTypes.map((e) => (
                                <option key={e.name} value={e.name}>{e.name}</option>
                            ))}
                        </select>

                        <div className="selection_div">
                            {form.diets.map((e) => (
                                <div key={e}>
                                    {e}
                                    <button className='btn_x' name={e} onClick={(e) => handleDelete(e)}>X</button>
                                </div>
                            ))}
                        </div>

                        <div>
                            <button className='btn_submit' type='submit'>Create</button>
                        </div>


                    </form>
                </div>
            </div>

            <div className="final_div_create">.</div>
        </div>
    )
}