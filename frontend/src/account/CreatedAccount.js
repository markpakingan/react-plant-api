import React from "react";
import { Link } from "react-router-dom";

const CreatedAccount = () => {

    return(
        <>
            <h1>Account Created!</h1>

            <p> 
                 <Link to="/login">LOGIN </Link>
                to access your account!
            </p>
        </>
    )
}


export default CreatedAccount;