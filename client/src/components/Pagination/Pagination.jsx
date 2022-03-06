import React from "react";
import './Pagination.css';

export default function Pagination({cardPerPage, totalCards, paginate, currentPage}){

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCards/cardPerPage); i++){
        pageNumbers.push(i);    
    }

    return(
        <div className="pagination_div">
            <ul>
                {pageNumbers.length >1 &&
                    pageNumbers.map((p)=>{
                        return (
                            <li key={p}>
                                <button className="button_pag" onClick={()=> paginate(p)}>
                                    {p}
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}