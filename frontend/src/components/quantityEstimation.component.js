import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import "/node_modules/jquery/dist/jquery.min.js";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import axios from 'axios';
import moment from 'moment';


import AssertBox from "./subcomponents/assertBox.component";
import ErrorBox from "./subcomponents/errorBox.component";
import Loader from "./subcomponents/loader.component";


import configData from "../config/config.json"
const API_URL = configData.SERVER_URL;




export default function QuantityEstimation(){    


    
    
    let [topics, setTopics] = useState([]);
    let [brands, setBrands] = useState([]);


    let [chartQuantCat, setChartQuantCat] = useState([["Topic", "Occurences"]]);
    let [brandQuantCat, setBrandQuantCat] = useState("");
    let [modelsQuantCat, setModelsQuantCat] = useState([]);
    let [modelQuantCat, setModelQuantCat] = useState("");

    let [chartQuantCatYear, setChartQuantCatYear] = useState([["Year", "Occurences"]]);
    let [brandQuantCatYear, setBrandQuantCatYear] = useState("");
    let [modelsQuantCatYear, setModelsQuantCatYear] = useState([]);
    let [modelQuantCatYear, setModelQuantCatYear] = useState("");
    let [topicQuantCatYear, setTopicQuantCatYear] = useState("");
    

    let [isLoading, setIsLoading] = useState(false);

    


    let [errorMessage, setErrorMessage] = useState('');
    let [errorDisplay, setErrorDisplay] = useState(false);
    let [errorOk, setErrorOk] = useState(() => () => {setErrorDisplay(false); setErrorMessage('');});
    
    const setError = (msg) => {
        setErrorMessage(msg);
        setErrorDisplay(true);
    }
           
    let [assertMessage, setAssertMessage] = useState('');
    let [assertDisplay, setAssertDisplay] = useState(false);
    let [assertYes, setAssertYes] = useState(undefined);
    let [assertNo, setAssertNo] = useState(undefined);    
    
    const assertProceed = (data, msg, function_to_execute) => {
        setAssertMessage(msg);
        setAssertYes(() => () => {
            setAssertDisplay(false);
            setAssertMessage('');            
            function_to_execute(data);
        
        });
        setAssertNo(() => () => {
            setAssertDisplay(false);
            setAssertMessage('');
            setAssertYes(() => () => {});
        })
        setAssertDisplay(true);
    }

  
    let [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const breakpointSize = 1400;

    const options = {
        timeline: { showRowLabels: false },
        avoidOverlappingGridLines: false,
    };

    useEffect(() => {
        getTopics();
        getBrands();
        window.addEventListener('resize', (event) => {
            setWindowWidth(window.innerWidth);
          });
    }, []);


    async function  getTopics(e){
        await setIsLoading(true);
        await axios.post(API_URL + "getTopics",{} ,{withCredentials: true} )
        .then(response => {
            if (response.status == 200) {    
                setTopics(response.data)
            }
            else{  
                console.log(response);
                setError("Something went wrong! The Following Error Occured: " + response.data.message);   
            } 
        })
        .catch(e=>{
            setError("Something went wrong! The Following Error Occured: " + e);
        });
        await setIsLoading(false);
    };

    async function  getBrands(e){
        await setIsLoading(true);
        await axios.post(API_URL + "getBrands",{} ,{withCredentials: true} )
        .then(response => {
            if (response.status == 200) {  
                setBrands(response.data)
            }
            else{  
                console.log(response);
                setError("Something went wrong! The Following Error Occured: " + response.data.message);   
            } 
        })
        .catch(e=>{
            setError("Something went wrong! The Following Error Occured: " + e);
        });
        await setIsLoading(false);
    };

    async function  getModelsQuantCat(data){
        await setIsLoading(true);
        await axios.post(API_URL + "getModels",data ,{withCredentials: true} )
        .then(response => {
            if (response.status == 200) {
                console.log(response)   
                setModelsQuantCat(response.data)
            }
            else{  
                console.log(response);
                setError("Something went wrong! The Following Error Occured: " + response.data.message);   
            } 
        })
        .catch(e=>{
            setError("Something went wrong! The Following Error Occured: " + e);
        });
        await setIsLoading(false);
    };


    async function  getQuantCat(data){
        await setIsLoading(true);
        await axios.post(API_URL + "getCountProblems",data ,{withCredentials: true} )
        .then(response => {
            if (response.status == 200) {     
                console.log(response.data)
                setChartQuantCat(response.data)
            }
            else{  
                console.log(response);
                setError("Something went wrong! The Following Error Occured: " + response.data.message);   
            } 
        })
        .catch(e=>{
            setError("Something went wrong! The Following Error Occured: " + e);
        });
        await setIsLoading(false);
    };



    function changeBrandQuantCat(val){
        setBrandQuantCat(val);
        if(val == 0){
            setModelQuantCat([]);
        }else{
            getModelsQuantCat({brand: val});
        }
        setChartQuantCat([["Topic", "Occurences"]]);

    }

    function changeModelQuantCat(val){
        setModelQuantCat(val)
        if(val!="" && brandQuantCat !=""){
                getQuantCat({model: val, brand: brandQuantCat})
        }

    }


    
    async function  getModelsQuantCatYear(data){
        await setIsLoading(true);
        await axios.post(API_URL + "getModels",data ,{withCredentials: true} )
        .then(response => {
            if (response.status == 200) { 
                setModelsQuantCatYear(response.data)
            }
            else{  
                console.log(response);
                setError("Something went wrong! The Following Error Occured: " + response.data.message);   
            } 
        })
        .catch(e=>{
            setError("Something went wrong! The Following Error Occured: " + e);
        });
        await setIsLoading(false);
    };

    async function  getQuantCatYear(data) {
        await setIsLoading(true);
        await axios.post(API_URL + "getCountProblemsYear",data ,{withCredentials: true} )
        .then(response => {
            if (response.status == 200) {     
                console.log(response.data)
                setChartQuantCatYear(response.data)
            }
            else{  
                console.log(response);
                setError("Something went wrong! The Following Error Occured: " + response.data.message);   
            } 
        })
        .catch(e=>{
            setError("Something went wrong! The Following Error Occured: " + e);
        });
        await setIsLoading(false);
    };
    
    function changeBrandQuantCatYear(val){
        setBrandQuantCatYear(val);
        if(val == 0){
            setModelQuantCatYear([]);
        }else{
            getModelsQuantCatYear({brand: val});
        }
        setChartQuantCatYear([["Topic", "Occurences"]]);
        

    }

    function changeModelQuantCatYear(val){
        setModelQuantCatYear(val)
        if(val!="" && brandQuantCatYear !="" && topicQuantCatYear){
                getQuantCatYear({model: val, brand: brandQuantCatYear, topic: topicQuantCatYear})
        }

    }

    function changeTopicQuantCatYear(val){
        setTopicQuantCatYear(val)
        if(val!="" && brandQuantCatYear !="" && modelQuantCatYear != ""){
                getQuantCatYear({model: modelQuantCatYear, brand: brandQuantCatYear, topic: val})
        }

    }


    
    return( 
        <div style={{textAlign: 'left'}}> 
            <div className="row mb-3">
                <div className="col-12">
                    <h3>Quantities</h3>                
                </div>
            </div>

        {isLoading && 
            <Loader/>
        }        
        {assertDisplay && 
            <AssertBox onConfirm={assertYes} onCancel={assertNo} message={assertMessage}/>
        }
        {errorDisplay && 
            <ErrorBox onConfirm={errorOk} message={errorMessage}/>
        }

        {true && 
            <div className="row row-cols-1 row-cols-md-1">   
                <div className="col">                        
                    <div className="autosense-card shadow">
                        <div className="autosense-card-title">
                            <h3>Total Occurences</h3>
                            <hr></hr>
                            <div className="row">
                                <div className="col-12" style={{marginTop: '10px'}}>
                                <label className="input-field-label" htmlFor="brandQuantCat">Select Brand: </label>
                                    <select 
                                        type="search"
                                        className="input-field"
                                        name="brandQuantCat"
                                        value={brandQuantCat}
                                        onChange={e => {changeBrandQuantCat(e.target.value)}} >
                                            <option value="0" key="0"></option>
                                            {brands.map((i) =>{
                                                return( <option value={i} key={i}>{i}</option>)
                                            })}
                                    </select> 
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-5" style={{marginTop: '10px'}}>
                                <label className="input-field-label" htmlFor="modelQuantCat">Select Model: </label>
                                    <select 
                                        type="search"
                                        className="input-field"
                                        name="modelQuantCat"
                                        value={modelQuantCat}
                                        onChange={e => {changeModelQuantCat(e.target.value)}} >
                                            <option value="0" key="0"></option>
                                            {modelsQuantCat.map((i) =>{
                                                return( <option value={i} key={i}>{i}</option>)
                                            })}
                                    </select> 
                                </div>
                            </div>
                            {
                                chartQuantCat.length > 1 &&
                          
                                <Chart
                                    chartType="Bar"
                                    width="100%"
                                    height="300px"
                                    data={chartQuantCat}
                                    options={{
                                        chart: {
                                        title: "Total Occurences",
                                        subtitle: "per Model",
                                        hAxis: {
                                        minValue: 0,
                                        },
                                        vAxis: {
                                        },
                                        }}}
                                    />  
                                }
                        </div>
                    </div>
                </div>
                <div className="col">                        
                    <div className="autosense-card shadow">
                        <div className="autosense-card-title">
                            <h3>Total Occurences per Quarter </h3>
                            <hr></hr>
                            <div className="row">
                                <div className="col-12" style={{marginTop: '10px'}}>
                                <label className="input-field-label" htmlFor="brandQuantCat">Select Topic: </label>
                                    <select 
                                        type="search"
                                        className="input-field"
                                        name="topicQuantCatYear"
                                        value={topicQuantCatYear}
                                        onChange={e => {changeTopicQuantCatYear(e.target.value)}} >
                                            <option value="0" key="0"></option>
                                            {topics.map((i) =>{
                                                return( <option value={i} key={i}>{i}</option>)
                                            })}
                                    </select> 
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12" style={{marginTop: '10px'}}>
                                <label className="input-field-label" htmlFor="brandQuantCatYear">Select Brand: </label>
                                    <select 
                                        type="search"
                                        className="input-field"
                                        name="brandQuantCatYear"
                                        value={brandQuantCatYear}
                                        onChange={e => {changeBrandQuantCatYear(e.target.value)}} >
                                            <option value="0" key="0"></option>
                                            {brands.map((i) =>{
                                                return( <option value={i} key={i}>{i}</option>)
                                            })}
                                    </select> 
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mb-5" style={{marginTop: '10px'}}>
                                <label className="input-field-label" htmlFor="modelQuantCatYear">Select Model: </label>
                                    <select 
                                        type="search"
                                        className="input-field"
                                        name="modelQuantCatYear"
                                        value={modelQuantCatYear}
                                        onChange={e => {changeModelQuantCatYear(e.target.value)}} >
                                            <option value="0" key="0"></option>
                                            {modelsQuantCatYear.map((i) =>{
                                                return( <option value={i} key={i}>{i}</option>)
                                            })}
                                    </select> 
                                </div>
                            </div>
                            {
                                chartQuantCatYear.length > 1 &&
                          
                                <Chart
                                    chartType="Bar"
                                    width="100%"
                                    height="300px"
                                    data={chartQuantCatYear}
                                    options={{
                                        chart: {
                                        title: "Total Occurences",
                                        subtitle: "per Quarter",
                                        hAxis: {
                                        minValue: 0,
                                        },
                                        vAxis: {
                                        },
                                        }}}
                                    />
                            }
                        </div>
                    </div>
                </div>
            </div>
        }       
        </div>    
    );

}