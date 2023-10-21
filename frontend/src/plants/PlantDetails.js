import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom"


const PlantDetails = () => {
    
    const PLANTLIST_DATA_API = "http://localhost:3001/plantlist";

    const {id} = useParams();
    const plant_true_id = id;
    
    const [details, setDetails] = useState([]);

    const [selectedPlantGroup, setSelectedPlantGroup] = useState("");
    const [plantGroups, setPlantGroups] = useState([]);
    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id");

    // Fetch data for a specific plant based on id
    useEffect(()=> {
        async function getPlantDetails(){
            try{
                const response = await axios.get(`${PLANTLIST_DATA_API}/${plant_true_id}`);
                const plantData = response.data;
                setDetails(plantData.plant);
                console.log("plantDetails value:", plantData.plant);
            }catch(err){
                console.error(err)
            }
        }
        getPlantDetails();
    }, [plant_true_id])



    // Fetch Data of all plant groups based on user_id
    useEffect(()=> {
        async function fetchPlantGroups() {

            try{
                console.log("user_id in plant details", user_id);
                const response = await axios.get(`${PLANTLIST_DATA_API}/get-all-plant-groups/user/${user_id}`);
                const plantGroups = response.data;
                console.log("Plant Group Data", plantGroups);
                setPlantGroups(plantGroups.plantGroups)
            }catch(err){
                console.error("Can't Fetch Plant Group Details", err)
            }

        }
        fetchPlantGroups();
    }, [user_id]);


    const handleClick = () => {
        navigate("/plantlist")
    }

    // Add current plant to a plantGroup
    const handleAddToPlantGroup = async () => {
        try {
            const { id, common_name} = details;
            
            const plant_true_id = id;
            const group_id = selectedPlantGroup;

            console.log("Plant Details to be sent:", {
                plant_true_id,
                common_name,
                group_id,
                user_id
            });

            const response = await axios.post(`${PLANTLIST_DATA_API}/add-plant-to-group/`, {
                plant_true_id,
                common_name,
                group_id,
                user_id
            });
            
            
            console.log("Data added:", response.data);

            alert(`${common_name} has been added!`);

            navigate("/plantlist")
        } catch (err) {
            console.error("Failed to add plant details to plantgroup", err);
        }
    };
    
 
    // gets the value of the selected plant group and put it in the data
    const handleSelectedPlantGroupChange = (e) => {

        // const parsedGroupId = parseInt(e.target.value, 10);
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

                    {/* selects a Plant Group from the dropdown menu */}
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

        // <>
        //     <h1>Here are the plant details</h1>
        // </>
    )
}

export default PlantDetails;

