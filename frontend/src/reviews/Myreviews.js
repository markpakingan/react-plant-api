import React, {useEffect} from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Myreviews = ({isAuthenticated}) => {

    const navigate = useNavigate()

     // Checks if token is available, otherwise redirect
     useEffect(() => {
        if (!isAuthenticated) {
        navigate("/");
        }
    }, [isAuthenticated, navigate]);


    return(
        <div>
            <h1>This is My Reviews page!</h1>
        </div>
    )
}

export default Myreviews;