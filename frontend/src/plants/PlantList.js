import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./plantList.css";


const PlantList = ({isAuthenticated}) => {

const navigate = useNavigate();

const PLANTLIST_DATA_API = "http://localhost:3001/plantlist";
const [details, setDetails] = useState([]);


useEffect(()=>{
    async function fetchPlantList() {

        try{
            const response = await axios.get(PLANTLIST_DATA_API)
            const plantData = response.data;
            setDetails(plantData.plant.data);
            console.log("setDetails Value", plantData.plant.data);
            
        }catch(err){
            console.log("Error fetching plants:", err)
        }

    }

    fetchPlantList();
}, [])

    // Checks if token is available, otherwise redirect
    useEffect(() => {
        if (!isAuthenticated) {
        navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="plant-list-container">
            <h1>Here Are Some Plants You May Like:</h1>

            <div className="plant-containers">
                {details.map((plant)=> (
                    <div className= "plant-item" key={plant.id}>
                        <div className="plant_item-content">  Name: {plant.common_name} </div>
                        <div className="plant_item-content">  Scientific Name: {plant.scientific_name} </div>
                        <div className="plant_item-content">  Cycle: {plant.cycle} </div>
                        
                        <div className="plant-item-image">
                            {plant.default_image ? (<img src={plant.default_image.thumbnail} 
                                alt={plant.common_name} />) : 
                                ("")
                                }
                        </div>
                          
                        <a href={`/plantlist/${plant.id}`}>
                            <button className="plant-item-button">Check Plant</button>
                        </a>
                    </div>

                ))}
            </div>
        </div>
    )
}



export default PlantList;