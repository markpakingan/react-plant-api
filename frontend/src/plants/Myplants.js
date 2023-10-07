import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const PLANT_GROUP_API = "http://localhost:3001/plantlist/get-all-plant-groups"

const MyPlants = () => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/create-plant-group")
    }


    useEffect(()=> {
        async function fetchPlantGroup() {
            try{
                const response = await axios.get(PLANT_GROUP_API);
                const plantCluster = response.data;
                console.log("plantCluster Data is", plantCluster.plantGroups);
                setData(plantCluster.plantGroups)

            }catch(err){
                console.error("Error getting the plangroups API:", err)
            }
        }
        fetchPlantGroup();
    }, [])


    const handleDelete = async(handle) => {

        try{
            await axios.delete(`http://localhost:3001/plantlist/${handle}`);

            const response = await axios.get(PLANT_GROUP_API);
            setData(response.data.plantGroups);
            // console.log("You clicked the delete button");
            
        }catch(err){
            console.error("Error deleting plant group", err)
        }
    }


    return(
        <div>
            <h1>This is the My Plants page!</h1>

            <button onClick={handleClick}> Create Plant Group</button>

        <ul>
            {data.map((cluster, index)=> (
                    
                        <li key ={index}>
                            <h3>Name: {cluster.group_name}</h3>
                            <p>About: {cluster.description}</p>
                            <button onClick={()=> handleDelete(`${cluster.group_name}`)}>Delete</button>
                        </li>
                    
                ))}
        </ul>
            
            
        </div>
    )
}

export default MyPlants;