import React, { useEffect, useState, useRef } from "react";

import "/node_modules/jquery/dist/jquery.min.js";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import axios from 'axios';


import AssertBox from "./subcomponents/assertBox.component";
import ErrorBox from "./subcomponents/errorBox.component";
import Loader from "./subcomponents/loader.component";



import configData from "../config/config.json"
const API_URL = configData.SERVER_URL;
axios.defaults.withCredentials = true;



export default function Chat(){    

    const messageScroller = useRef(null)

    let [messages, setMessages] = useState([]);
    let [currentQuestion, setCurrentQuestion] = useState([]); 
    
    let [isLoading, setIsLoading] = useState(false);


    let [errorMessage, setErrorMessage] = useState('');
    let [errorDisplay, setErrorDisplay] = useState(false);
    let [errorOk, setErrorOk] = useState(() => () => {setErrorDisplay(false); setErrorMessage('');});
    
    const setError = (msg) => {
        setErrorMessage(msg);
        setErrorDisplay(true);
    }

    // code to handle asserts
    //<button onClick={() => assertProceed("testprocees", executeFunctionAfterConfirm)}>test</button>                
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

    const handleKeypress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
      };

      const doScroll = () => {
        //messageScroller.current?.scrollIntoView({ behavior: 'smooth' })//messageScroller.current.scrollTop = "9999999";
        if (messageScroller) {
            setTimeout(() => {  messageScroller.current.scroll({ top: messageScroller.current.scrollHeight, behavior: 'smooth' });}, 5);             
        }
}


    let [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const breakpointSize = 1400;


   
    const sendMessage = () => {
        if(currentQuestion != ""){
            let m = messages;
            let m1 = m.concat([{sender: "own", message: currentQuestion}]);
            let m2 = m.concat([{sender: "own", message: currentQuestion}, {sender: "bot", message: "This is a mockup reply! Our System is currently under development. In case you have any questions, feel free to contact the AutoSense Team."}]);
            setMessages(m1, doScroll())
            
            setCurrentQuestion("");
            setTimeout(() => {  setMessages(m2, doScroll())}, 1000);            
            
        }
        
    }
    
    const Message = (props) => {
        if(props.obj.sender == "own"){
            return ( 
             <div className="row">
                <div className="col-2">
                </div>
                <div className="col-10" style={{textAlign: "right"}}>
                    <div style={{padding: "10px 20px", backgroundColor: "rgb(187, 252, 169)", marginBottom: "20px", borderRadius: "20px", display: "inline-block", textAlign: "left"}}>
                        {props.obj.message}
                    </div>
                </div>
             </div>            
            )
        }else{
            return (
                <div className="row">
                    <div className="col-10"  style={{textAlign: "left"}}>
                        <div style={{padding: "10px 20px", backgroundColor: "rgb(194, 230, 252)", marginBottom: "20px", borderRadius: "20px", display: "inline-block"}}>
                            {props.obj.message}
                        </div>
                    </div>
                    <div className="col-2">
                    </div>
                </div>
            )
        }
        
    };
    

    const MessageList = () => {
        return messages.map((currentObj, i) => {
           return <Message key={i} obj={currentObj}/>
        })
    }

    return( 
        <div style={{textAlign: 'left'}}> 
            <div className="row mb-1">
                <div className="col-12">
                    <h3>Chat</h3>                
                </div>
            </div>
            <div className="row mb-2">                
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
        <div >
            <div  ref={messageScroller} style={{height: "calc(70vh - 100px)", overflowY: "auto", overflowX: "hidden", border:"1px solid lightgrey", padding: "10px", borderRadius: "5px", backgroundColor: "white"}}>
                <div className="row">    
                    <div className="col-12 ">
                        <MessageList/>
                    </div>
                </div>  
            </div>
            <div style={{height: "20vh"}}>
                <div className="row mt-3">
                    <div className="col-12">
                        <textarea
                            style={{width: "100%", borderRadius: "5px"}}
                            onKeyPress={(e) => handleKeypress(e)}
                            maxLength = "2000" 
                            placeholder="Type in Question ..." 
                            className="input-field"
                            name="currentQuestion"
                            value={currentQuestion}
                            onChange={e => {setCurrentQuestion(e.target.value)}}   
                        />
                        <button className="btn btn-primary mt-1" style={{minWidth: "120px"}} onClick={ () => sendMessage(true)}>Ask</button>   
                    </div>
                </div> 
            </div>     
        </div>
                    
        </div>    
    );

}