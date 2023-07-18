import React, { useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Link, Routes, BrowserRouter, useLocation  } from "react-router-dom";
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./App.scss";


import Home from "./components/home.component";
import Footer from "./components/footer.component";
import NavigationBarFull from "./components/navigationBarFull.component";
import NavigationBarPart from "./components/navigationBarPart.component";
import SideBar from "./components/sideBar.component";
import QuantityEstimation from "./components/quantityEstimation.component";
import Chat from "./components/chat.component";


function App() {


  let [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let [dispNav, setDispNav] = useState(true);
  const location = useLocation();
  const breakpointSize = 600;

  useEffect(() => {
    // execute on location change
    if(window.location.pathname.includes(["chat"]) == false){
      setDispNav(true)
    }else{
      setDispNav(false)
    }
    console.log('Location changed!', location.pathname);
}, [location]);

  useEffect(() => {
    window.addEventListener('resize', (event) => {
      setWindowWidth(window.innerWidth);
    });
    window.addEventListener('orientationchange', (event) => {
      setWindowWidth(window.innerWidth);
    });

  });

  return (
    <div className="App">
      <header><meta name="apple-mobile-web-app-status-bar-style" content="white"></meta></header>   
      <div className="main-sidebar-wrapper">             
          {window.innerWidth > breakpointSize &&
          <div className="sidebar">        
            <SideBar/>
          </div> 
          }         
          <div className="main">
            {window.innerWidth > breakpointSize  &&
            <NavigationBarPart/>
            }
            { window.innerWidth <= breakpointSize &&
            <NavigationBarFull/>            
            }
            <div className="wrapper-autosense" style={{minHeight: '95vh'}}>              
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/quantityEstimation" element={<QuantityEstimation/> }/>       
                <Route path="/chat" element={<Chat/> }/>   
                <Route path="*" element={<Home/>}/>
              </Routes>              
            </div> 
            {dispNav &&         
              <Footer/>   
            }
        </div> 
      </div>  
    </div>
  );
}

export default App;
