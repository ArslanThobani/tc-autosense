import React from "react";
import {Nav} from 'react-bootstrap';


export default function NavigationBarPart(){

    return( 
      <>
        <nav className="navbar navbar-fixed shadow navbar-expand navbar-light bg-light mb-3" style={{maxHeight: "56px", minHeight: "56px"}} >
        <div className="container-fluid wrapper-ersiees">
          <a className="navbar-brand" href="#" style={{width:0, padding: 0, margin:0}}></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-4 me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Nav.Link href="/quantityEstimation">Quantity Estimation</Nav.Link>
              </li>    
              <li className="nav-item">
                <Nav.Link href="/chat">Chat</Nav.Link>
              </li>                       
            </ul>                          
          </div>          
        </div>        
      </nav>    
      <div className="mb-3" style={{minHeight: "59px"}}></div> 
      </>     
    )}