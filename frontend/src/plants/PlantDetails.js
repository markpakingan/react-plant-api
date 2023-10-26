import React, {useState, useEffect} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom"
import "./plantDetails.css"

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
        <div className="plant-details-container">
            <h1> Plant Details: </h1>
            <ul>
                <div>
                    {details.default_image ? (<img src={details.default_image.thumbnail} 
                    alt={details.common_name} />) : 
                    (  <p>No image available</p>)
                    }
                </div>
                <div> 
                    <b>Common Name:</b> {details.common_name}
                </div>
                <div> 
                    <b>Scientific Name:</b> {details.scientific_name}
                </div>
                <div> 
                    <b>Type :</b> {details.type}
                </div>

                <div> 
                <b>Cycle:</b> {details.cycle}
                </div>

                <div> 
                    <b>Water:</b> {details.watering}
                </div>

                <div> 
                    <b>Sunlight:</b> {details.sunlight}
                </div>

                <div> 
                    <b>Pruning Month:</b> {details.pruning_month}
                </div>

                <div> 
                    <b>Indoor:</b> {details.indoor}
                </div>

                <div> 
                    <b>Poisonus to Humans?:</b> {details.poisonous_to_humans}
                </div>

                <div className="description"> 
                    <b>Description:</b> {details.description}
                </div>

                <div>
                    <b>Family:</b> {details.family}
                </div>

                <button className="go-back-button" onClick={handleClick}> Go Back</button>

                <div className="select-option">

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

                    <button className="add-button" onClick={handleAddToPlantGroup
                    }>Add</button>
                </div>

            </ul>
        </div>

    )
}

export default PlantDetails;

