import React from "react";
import "/node_modules/jquery/dist/jquery.min.js";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';



export default function Footer(){    
    return( 
        <div className="footer-dark">
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-md-3 item">
                            <h3>Support</h3>
                            <ul>
                                <li><a href="https://autosense.jimdosite.com/contact/">Contact</a></li>
                            </ul>
                        </div>
                        <div className="col-sm-6 col-md-3 item">
                            <h3>About</h3>
                            <ul>
                                <li><a href="https://autosense.jimdosite.com/">Homepage</a></li>
                            </ul>
                        </div>
                        <div className="col-md-6 item text">
                            <h3>AutoSense</h3>
                            <p>We provide Reasearch on EV Quantity Estimation.</p>
                        </div>                        
                    </div>
                    <p className="copyright">AutoSense © 2023</p>
                </div>
            </footer>
        </div> 
    )}