import React from "react";
import { useNavigate } from "react-router-dom";


const MyPlants = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/create-plant-group")
    }
    return(
        <div>
            <h1>This is the My Plants page!</h1>

            <button onClick={handleClick}> Create Plant Group</button>
        </div>
    )
}

export default MyPlants;