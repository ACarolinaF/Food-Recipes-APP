import React, { useEffect } from "react";
import './CreateRecipe.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getTypes } from "../../actions";
import { postRecipe } from "../../actions";


//COMPONENTS
import NavBar from "../NavBar/NavBar";
import NavBar_SS from "../NavBar_SS/NavBar_SS";



const validate = form => {
    let URL = /^(www)?.+\.[a-z]{2,6}(\.[a-z]{2,6})?.+\.[a-z]{2,4}$/;
    let errors = {};

    if (!form.name) {
        errors.name = 'Recipe name is required'
    }
    // else if (form.name.length < 4) {
    //     errors.name = 'Recipe name must have at least 4 characters'
    // }

    // if (form.image) {
    //     if (!URL.test(form.image)) {
    //         errors.image = "The image uploaded must be an URL";
    //     }
    // }

    if (!form.summary) {
        errors.summary = 'Summary is required'
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

    return errors;
}



export default function CreateRecipe() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dietTypes = useSelector((state) => state.dietTypes)


    const [form, setForm] = useState({
        name: '',
        image: '',
        summary: '',
        score: '',
        healthScore: '',
        steps: [{ number: 1, step: '' }],
        diets: []
    });

    const [errors, setErrors] = useState({})
    const [added, setAdded] = useState(false);

    useEffect(() => {
        dispatch(getTypes(dispatch));

    }, []);


    //STEPS---------

    const handleStepsOnChange = e => {
        e.preventDefault();

        let stepsArray = form.steps;
        stepsArray[e.target.id - 1].step = e.target.value;

        setForm({
            ...form,
            steps: stepsArray
        })
    }

    const handleAddStep = e => {
        e.preventDefault()
        let new_step = { number: form.steps[form.steps.length - 1].number + 1, step: "" };
        //podria cortar el -1 co el +1

        setForm({
            ...form,
            steps: [...form.steps, new_step]
        })
    }

    const handleRemoveStep = e => {
        e.preventDefault()

        let newSteps = form.steps;

        if (newSteps.length > 1) newSteps.pop();

        setForm({
            ...form,
            steps: newSteps
        });
    }


    //--------------

    const handleChange = e => {
        e.preventDefault();

        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

        setErrors(validate({
            ...form,
            [e.target.name]: e.target.value
        }))

    };


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






    const handleSubmit = e => {
        e.preventDefault();

        validate(form);

        let dietSelectionError = [];
        if (form.diets.length < 1) {
            dietSelectionError.push('Diet Types are required')
        }

        if (Object.values(errors).length || dietSelectionError.length) {
            return alert(Object.values(errors).concat(dietSelectionError).join('\n'))
        }

        const steps_string = [];
        form.steps.map(e => {
            steps_string.push(e.step);
        })

        const post_form = {
            ...form,
            steps: steps_string
        }

        dispatch(getRecipes);
        dispatch(postRecipe(post_form))
        setForm({
            name: '',
            image: '',
            summary: '',
            score: '',
            healthScore: '',
            steps: [{ number: 1, step: '' }],
            diets: []
        })
        alert("Recipe Created Successfully")

        navigate('/home');

    }



    return (
        <div className="a_div">
            <div className="navBar_div_create">
                <NavBar_SS />
            </div>

            <div className="principal_div">
                <h2 className="title">Create a Recipe</h2>
                <div>
                    <form className="form" onSubmit={(e) => handleSubmit(e)}>


                        <h3 className="h3-title_create"><strong>Name:</strong></h3><br />
                        <input
                            className="input_name"
                            type="text" id='name' name='name'
                            value={form.name} onChange={(e) => handleChange(e)}
                            autoComplete='off' /><br />
                        {errors.name && <p className="error">{errors.name}</p>}

                        <h3 className="h3-title_create"><strong>Summary:</strong></h3><br />
                        <textarea
                            className="input_summary"
                            id='summary' name='summary'
                            cols='40' rows='10'
                            value={form.summary} onChange={(e) => handleChange(e)}
                            autoComplete='off' /><br />
                        {errors.summary && <p className="error">{errors.summary}</p>}

                        <div className="score_div_center">
                            <div>
                                <h3 className="h3-title_create"><strong>Score:</strong></h3><br />
                                <input
                                    className="input_score"
                                    id='score' name='score' type='number'
                                    value={form.score} onChange={(e) => handleChange(e)}
                                    autoComplete='off' /><br />
                                {errors.score && <p className="error">{errors.score}</p>}
                            </div>

                            <div>
                                <h3 className="h3-title_create"><strong>Health Score:</strong></h3><br />
                                <input
                                    className="input_score"
                                    id='healthScore' name='healthScore' type='number'
                                    value={form.healthScore} onChange={(e) => handleChange(e)}
                                    autoComplete='off' /><br />
                                {errors.healthScore && <p className="error">{errors.healthScore}</p>}
                            </div>
                        </div>

                        <div className="div_steps_create">
                            <h3 className="h3-title_create_steps">Steps:</h3>
                            <div>
                                <button className="btn_add_remove_steps" onClick={handleAddStep}>+</button>
                                <button className="btn_add_remove_steps" onClick={handleRemoveStep}>-</button>
                            </div>

                            <div className="div_steps_input">
                                {form.steps.map(s => (
                                    <h6 className="h_input_create">
                                        <input className="input_steps_create" type="text" id={s.number} name="step" onChange={handleStepsOnChange} autoComplete="off" />
                                    </h6>
                                ))}
                            </div>
                        </div>

                        <div className="up_review_steps_create">
                            <div className="review_steps_create">
                                <div>Have a look on how your steps will look like:</div>
                                <div>{form.steps.map(s => (<div><strong>{s.number}</strong> - {s.step}</div>))}</div>
                            </div>
                        </div>


                        <h3 className="h3-title_create"><strong>Select the Diet Types:</strong></h3>
                        <select className='select_diets' onChange={(e) => handleSelect(e)}>
                            <option>Select Here</option>
                            {dietTypes?.map((e) => (
                                <option key={e.name} value={e.name}>{e.name}</option>
                            ))}
                        </select>

                        <div className="up_selection_div">
                            <div className="selection_div">
                                {form.diets?.map((e) => (
                                    <div className="selection_diet_create" key={e}>
                                        {e}
                                        <button className='btn_x' name={e} onClick={(e) => handleDelete(e)}>X</button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="farta_create">
                            <div className="final_info_create">
                                <h5 className="h5_final_info">We will add a default image on your recipe</h5>
                                <h6 className="h5_final_info">(  No worries, that's beautiful :)  )</h6>
                            </div>
                        </div>

                        <div>
                            <button className='btn_submit' type='submit' disabled={added}>
                                {added ? <span>lindo!</span> : <span>Create</span>}
                            </button>
                        </div>


                    </form>
                </div>
            </div>

            <div className="final_div_create">.</div>
        </div>
    )
}