import React from "react";
import './Pagination.css';

export default function Pagination({ cardPerPage, totalCards, paginate, currentPage }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCards / cardPerPage); i++) {
        pageNumbers.push(i);
    }
    const limit_page = Math.ceil(totalCards / cardPerPage);

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

    // return (
    //     <div className="pagination_div">
    //         <ol>
    //             <li>
    //                 <button onClick={() => paginate(currentPage - 1)}> previous </button>
    //             </li>
    //             {/* pagina actual */}
    //                 <h6>{currentPage}</h6>
    //             <li>
    //                 {
    //                     currentPage+1 <= limit_page?(
    //                         <button onClick={() => paginate(currentPage + 1)}> next </button>
    //                     ):(
    //                        null
    //                     )
    //                 }
                    
    //             </li>
    //         </ol>

    //     </div>
    // )


}