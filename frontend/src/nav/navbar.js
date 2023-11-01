import React from "react";
import {NavLink} from "react-router-dom";
import "./navbar.css";
import bloombuddylogo from "../images/Logo4.png"

const Navbar = ({isAuthenticated, handleLogout})=> {

    return(

        <nav>
            {isAuthenticated? ( 
                <div className="nav-container">
                        <img className="bloom-logo"src={bloombuddylogo} alt="company-logo"/>
                        <NavLink exact to ="/"> Home </NavLink>
                        <NavLink exact to ="/plantlist"> Plant List </NavLink>
                        <NavLink exact to ="/my-plant-groups"> My Plant Groups</NavLink>
                        <NavLink exact to ="/mygardenpicks"> My Garden Picks</NavLink>
                        <NavLink exact to ="/myreviews"> My Reviews </NavLink>
                        <NavLink exact to ="/profile"> Profile </NavLink>
                        <NavLink exact to ="/logout" onClick={handleLogout}> Log Out </NavLink>
                </div>
            ):(
                <div>
                </div>

            )}
        </nav>
        
       
    )
}


export default Navbar;
