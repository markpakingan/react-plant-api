import React from "react";
import {NavLink} from "react-router-dom"

const Navbar = ()=> {

    return(
        <nav>
            <NavLink exact to ="/"> Home </NavLink>
            <NavLink exact to ="/plantlist"> Plant List </NavLink>
            <NavLink exact to ="/profile"> Profile </NavLink>
            <NavLink exact to ="/myplants"> My Plants </NavLink>
            <NavLink exact to ="/myreviews"> My Reviews </NavLink>
        </nav>
    )
}


export default Navbar;
