import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import logo from "../images/logo.jpg";



 
export default function SideBar(){
 
    let [collapsed, setCollapsed] = useState(true); 
    

    return( 
        <>
        <ProSidebar
            image={false}
            breakPoint="0px"
            collapsed = {collapsed}
            collapsedWidth = '70px'
            style={{height:'100%', position: "fixed"}}>
            <SidebarHeader>
                <div className="mt-2 mb-2" style={{textAlign: 'center'}}>
                    {collapsed ? 
                    (<div>
                        <i className="bi bi bi-list" style={{fontSize: '26px', cursor: 'pointer'}} onClick={() => setCollapsed(false)}></i><br></br>
                    </div>):
                    (<div className="row me-2" style={{textAlign: 'left'}}>
                        <div className="col-10">
                        <img src={logo} width="35" height="35" style={{marginLeft: '14px',marginRight: '7px' }}/>
                        <b>{'AutoSense'}</b>
                        </div>
                        <div className="col-2">
                        <i className="bi bi-x me-2" style={{fontSize: '26px', cursor: 'pointer'}} onClick={() => setCollapsed(true)}></i>
                        </div>
                    </div>)}
                </div>                
            </SidebarHeader>
            <SidebarContent style={{overflow: "auto"}}>
            <Menu iconShape="circle">
                <MenuItem icon={<i className="bi bi-house-door-fill"></i>}>
                    <Link to={{pathname:"/"}}>Home</Link>
                </MenuItem>
                <MenuItem icon={<i className="bi bi-bar-chart-line-fill"></i>}>
                    <Link to={{pathname:"/quantityEstimation"}}>Quantity Estimation</Link>
                </MenuItem>
                <MenuItem icon={<i className="bi bi-messenger"></i>}>
                    <Link to={{pathname:"/chat"}}>Chat</Link>
                </MenuItem>
            </Menu>
            </SidebarContent>
        </ProSidebar>
        <div className="mb-3" style={{minWidth: collapsed?"59px":"270px"}}>
        <div className="bg-light mb-3" style={{backgroundColor: "white", minHeight: "56px"}}></div> 
        </div> 
        </>   
    )}
   