import React, {useEffect} from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

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

            
            <Link to="/create-review">
                <button>
                    Create Review
                </button>
            </Link>

        </div>
    )
}

export default Myreviews;