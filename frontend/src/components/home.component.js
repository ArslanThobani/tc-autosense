import React, {} from "react";
import {Link} from "react-router-dom";
import {Nav} from 'react-bootstrap';
import "/node_modules/jquery/dist/jquery.min.js";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';



export default function Home(){    

    return( 
        <div className="mt-5">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mx-1 my-5">
                <div className="col mb-4">
                    <div className="card card-menu shadow">
                        <i className="bi bi-bar-chart-line-fill card-img-top mt-4"></i>
                        <div className="hovertext">Quantity Estimation for Car Manufactoring</div>
                        <div className="card-menu-body" >
                            <hr/>                            
                            <Link className="nav-link" to={{pathname:"/quantityEstimation"}}><b>Quantity Estimation</b></Link>
                        </div>
                    </div>
                </div>     
                <div className="col mb-4">
                    <div className="card card-menu shadow">
                        <i className="bi bi-messenger card-img-top mt-4"></i>
                        <div className="hovertext">Ask interactive Questions</div>
                        <div className="card-menu-body" >
                            <hr/>
                            <Link className="nav-link" to={{pathname:"/chat"}}><b>Chat</b></Link>
                        </div>
                    </div>
                </div>            
            </div>
        </div>    
    );

}