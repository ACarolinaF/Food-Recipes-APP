import React from "react";
import './RecipeDetail.css';


import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails } from "../../actions/index"

//COMPONENTS:
import NavBar from "../NavBar/NavBar.jsx";



export default function RecipeDetail() {

    const { id } = useParams();

    const recipeDetails = useSelector(state => state.recipeById)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            getDetails(id)
        );
    }, [dispatch, id])



    return (
        <div className="recipedetails_div">
            <div className="outro">
                <div className="outro_2">
                    <NavBar />
                </div>

                <div className="details_container">
                    <h1 className="title_principal_container_rd">{recipeDetails.name}</h1>
                    <div className="conjunt_rd">
                        <div className="card_img_rd">
                            <img className="img_rd" src={recipeDetails.image && recipeDetails.image} alt="Recipe Details" />
                            <div className="container_img_rd">.</div>
                        </div>

                        <div className="scores_div_rd">
                            <div className="scores_subdiv_rd">
                                <h2 className="titles_container_rd_score"><span>Score:</span></h2>
                                <div className="scores_sub_subdiv_rd">
                                    <p className="info_container_rd_score">{recipeDetails.score && recipeDetails.score}%</p>
                                </div>
                            </div>

                            <div className="scores_subdiv_rd">
                                <h2 className="titles_container_rd_score"><span>Health Score:</span></h2>
                                <div className="scores_sub_subdiv_rd">
                                    <p className="info_container_rd_score">{recipeDetails.healthScore && recipeDetails.healthScore}%</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="normal_div_rd">
                        <div className="central_div_rd">
                            <h2 className="titles_container_rd"><span>Dish Type(s):</span></h2>
                            <p className="info_container_rd"> {recipeDetails.dishTypes && recipeDetails.dishTypes.join(", ")}</p>
                        </div>
                        <div className="central_div_rd">
                            <h2 className="titles_container_rd"><span>Diet Type(s):</span></h2>
                            <p className="info_container_rd">{recipeDetails.diets && recipeDetails.diets.join(", ")}</p>
                        </div>
                    </div>

                    <div className="central_div_rd_tx">
                        <h2 className="titles_container_rd_sbs"><span>Summary:</span></h2>
                        <div className="text_rd">
                            <p className="info_container_tx">{recipeDetails.summary && recipeDetails.summary.replace(/(<([^>]+)>)/gi, "")}</p>
                        </div>
                    </div>


                    <div className="central_div_rd_tx">
                        <h2 className="titles_container_rd_sbs"><span>Step by step:</span></h2>
                        <div className="text_rd">
                            <p className="info_container_tx">{recipeDetails.steps && recipeDetails.steps.map(s => s.map((e, i) => <p><strong>{i + 1}</strong> - {e}</p>))}</p>
                        </div>
                    </div>
                </div>
                <NavLink to="/home">
                    <button className="back_button">Back</button>
                </NavLink>

            </div>
        </div>
    )
}