import React from "react";
import {NavLink} from "react-router-dom"

const Navbar = ({isAuthenticated, handleLogout})=> {

    return(

        <nav>
            {isAuthenticated? ( 
                <div>
                
                        <NavLink exact to ="/"> Home </NavLink>
                        <NavLink exact to ="/plantlist"> Plant List </NavLink>
                        <NavLink exact to ="/my-plant-groups"> My Plant Groups</NavLink>
                        <NavLink exact to ="/myplants"> My Plants</NavLink>
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
