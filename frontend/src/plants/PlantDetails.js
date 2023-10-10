import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom"


const PlantDetails = () => {
    
    const PLANTGROUPS_URL = "http://localhost:3001/plantlist/get-all-plant-groups";
    const PLANTLIST_DATA_API = "http://localhost:3001/plantlist";
    const PLANTGROUP_PLANTS = "http://localhost:3001/plantlist/add-plant-to-group";

    const {id} = useParams();
    const [details, setDetails] = useState([]);
    const [selectedData, setSelectedData] = useState({
        plant_true_id: "", // initialize with appropriate values
        common_name: "",
        scientific_name: "",
        group_id: ""
      });
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
                // console.log("plantDetails value:", plantData.plant);
            }catch(err){
                console.error(err)
            }
        }
        getPlantDetails();
    }, [id])




    useEffect(()=> {
        // Fetch Data of all plant groups
        async function fetchPlantGroups() {

            try{
                const response = await axios.get(PLANTGROUPS_URL);
                const plantGroups = response.data;
                // console.log("Plant Group Data", plantGroups);
                setPlantGroups(plantGroups.plantGroups)
            }catch(err){
                console.error("Can't Fetch Plant Group Details", err)
            }

        }
        fetchPlantGroups();
    }, []);


    const handleClick = () => {
        navigate("/plantlist")
    }





    // sends a post request to my_plant_group_plants

    const handleAddToPlantGroup = async () => {


        try {
            const { id, common_name } = details;

            console.log("Plant Details to be sent:", {
                id,
                common_name,
                selectedPlantGroup
            });

            const response = await axios.post(PLANTGROUP_PLANTS, {
                id,
                common_name,
                selectedPlantGroup
            });
            
            console.log("Data added:", response.data);
        } catch (err) {
            console.error("Failed to add plant details to plantgroup", err);
        }
    };
    
 

    const handleSelectedPlantGroupChange = (e) => {
        setSelectedPlantGroup(e.target.value);
        console.log("Plant Group Id Selected:", e.target.value);
    };

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

                    <select value = {selectedPlantGroup} 
                    onChange={handleSelectedPlantGroupChange}>

                        <option value = "">Add to My Plant Group</option>

                        {plantGroups.map((group)=> (
                            <option key={group.my_plant_group_id} value={group.my_plant_group_id}>
                                {group.group_name}
                            </option>
                        ))}
                    </select>

                    <button onClick={handleAddToPlantGroup
                    }>Add</button>
                </div>

            </ul>
        </div>
    )
}

export default PlantDetails;

