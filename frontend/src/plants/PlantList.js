import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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


    useEffect(() => {
        if (!isAuthenticated) {
        navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <h1>Check Out Some Plants!</h1>

            <div>
                {details.map((plant)=> (
                    <div key={plant.id}>
                        <div>  Name: {plant.common_name} </div>
                        <div>  Scientific Name: {plant.scientific_name} </div>
                        <div>  Cycle: {plant.cycle} </div>
                        
                        <div>
                            {plant.default_image ? (<img src={plant.default_image.thumbnail} 
                                alt={plant.common_name} />) : 
                                ("")
                                }
                        </div>
                          
                        <a href={`/plantlist/${plant.id}`}>
                            <button>Check Plant</button>
                        </a>
                    </div>

                ))}
            </div>
        </div>
    )
}



export default PlantList;