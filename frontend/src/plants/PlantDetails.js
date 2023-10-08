import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom"


const PlantDetails = () => {
    
    const PLANTLIST_DATA_API = "http://localhost:3001/plantlist";
    const {id} = useParams();
    const [details, setDetails] = useState([]);
    const [selectedPlantGroup, setSelectedPlantGroup] = useState("");
    const [plantGroups, setPlantGroups] = useState([]);
    const navigate = useNavigate();

    

    useEffect(()=> {


        // Fetch data for a specific plant based on id
        async function getPlantDetails(){
            try{
                const response = await axios.get(`${PLANTLIST_DATA_API}/${id}`);
                const plantData = response.data;
                setDetails(plantData.plant);
                console.log("plantDetails value:", plantData.plant);
            }catch(err){
                console.error(err)
            }
        }
        getPlantDetails();
    }, [id])



    const handleClick = () => {
        navigate("/plantlist")
    }


    const handleAddToPlantGroup = () => {
        console.log("Adding plant to plant group", selectedPlantGroup);
        // Make an API call or perform any logic to add the plant to the selected plant group
    }


    return(
        <div>
            <h1> Plant Details: </h1>
            <ul>
                <li>
                    {details.default_image ? (<img src={details.default_image.thumbnail} 
                    alt={details.common_name} />) : 
                    (  <p>No image available</p>)
                    }
                </li>
                <li> Common Name: {details.common_name}</li>
                <li> Scientific Name: {details.scientific_name}</li>
                <li> Type : {details.type}</li>
                {/* <li> Dimension: {details.dimension}</li> */}
                <li> Cycle: {details.cycle}</li>    
                {/* <li> Hardiness: {details.hardiness}</li> */}
                <li> Water: {details.watering}</li>
                <li> Sunlight: {details.sunlight}</li>
                <li> Pruning Month: {details.pruning_month}</li>
                <li> Indoor: {details.indoor}</li>
                <li> Poisonus to Humans?: {details.poisonous_to_humans}</li>
                <li> Description: {details.description}</li>
                <li>Family: {details.family}</li>

                <button onClick={handleClick}> Go Back</button>

                <div>

                    <select value = {selectedPlantGroup} onChange={(e) => selectedPlantGroup(e.target.value)}>
                        <option value = "">Add to My Plant Group</option>

                        {plantGroups.map((group)=> (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleAddToPlantGroup}>Add</button>
                </div>

            </ul>
        </div>
    )
}

export default PlantDetails;

