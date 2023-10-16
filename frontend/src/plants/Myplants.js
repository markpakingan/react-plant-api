import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const PLANT_GROUP_API = "http://localhost:3001/plantlist/get-all-plant-groups"

const MyPlants = ({isAuthenticated}) => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/create-plant-group")
    }
    const user_id = parseInt(localStorage.getItem("user_id"),10);


    // fetch all existing plantgroup
    useEffect(()=> {
        console.log("User_id in plantlist:", user_id);
        async function fetchPlantGroup() {
            try{
                const response = await axios.get(`${PLANT_GROUP_API}/user/${user_id}`);
                const plantCluster = response.data;
                // console.log("plantCluster Data is", plantCluster.plantGroups);
                setData(plantCluster.plantGroups)

            }catch(err){
                console.error("Error getting the plangroups API:", err)
            }
        }
        fetchPlantGroup();
    }, [user_id])


    const handleDelete = async(handle) => {

        try{
            await axios.delete(`http://localhost:3001/plantlist/${handle}`);

            const response = await axios.get(PLANT_GROUP_API);
            setData(response.data.plantGroups);
            
        }catch(err){
            console.error("Error deleting plant group", err)
        }
    }

    const handleEdit = (groupId) => {
        console.log("you clicked the edit button!");
        navigate(`/edit-plant-group/${groupId}`)
    }


     // Checks if token is available, otherwise redirect
     useEffect(() => {
        if (!isAuthenticated) {
        navigate("/");
        }
    }, [isAuthenticated, navigate]);


    return(
        <div>
            <h1>This is the My Plants page!</h1>

            <button onClick={handleClick}> Create Plant Group</button>

        <ul>
            {data.map((cluster, index)=> (
                    
                        <li key ={index}>
                            <h3>Name: {cluster.group_name}</h3>
                            <p>About: {cluster.description}</p>
                            {/* <p>ID: {cluster.my_plant_group_id}</p> */}
                            <button onClick={()=> handleEdit(`${cluster.my_plant_group_id}`)}>Edit</button>
                            <button onClick={()=> handleDelete(`${cluster.group_name}`)}>Delete</button>
                        </li>
                    
                ))}
        </ul>
            
            
        </div>
    )
}

export default MyPlants;