import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PLANT_GROUP_API = "http://localhost:3001/plantlist/get-all-plant-groups";

const MyPlants = ({ isAuthenticated }) => {
  const [plantData, setPlantData] = useState([]);
  const [refreshData, setRefreshData] = useState(false); // State variable to trigger useEffect
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create-plant-group");
  };
  const user_id = parseInt(localStorage.getItem("user_id"), 10);

  // Checks if token is available, otherwise redirect
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // fetch all existing plantgroup based on the user_id
  useEffect(() => {
    async function fetchPlantGroup() {
      try {
        const response = await axios.get(`${PLANT_GROUP_API}/user/${user_id}`);
        const plantCluster = response.data;
        setPlantData(plantCluster.plantGroups);
      } catch (err) {
        console.error("Error getting the plant groups API:", err);
      }
    }
    fetchPlantGroup();
  }, [user_id, refreshData]); // Add refreshData to the dependency array

  const handleEdit = (groupId) => {
    navigate(`/edit-plant-group/${groupId}`);
  };

  const handleDelete = async (group_name) => {
    try {
      await axios.delete(`http://localhost:3001/plantlist/${group_name}`);
      console.log("Deleted in myPlants:", group_name);
      // Trigger useEffect by changing the state variable
      setRefreshData(!refreshData);
    } catch (err) {
      console.error("Error deleting plant group", err);
    }
  };

  return (
    <div>
      <h1>This is the My Plants page!</h1>
      <button onClick={handleClick}> Create Plant Group</button>
      <ul>
        {plantData.map((cluster, index) => (
          <li key={index}>
            <h3>Name: {cluster.group_name}</h3>
            <p>About: {cluster.description}</p>
            <button onClick={() => handleEdit(`${cluster.my_plant_group_id}`)}>Edit</button>
            <button onClick={() => handleDelete(`${cluster.group_name}`)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPlants;


// import React, {useEffect, useState} from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


// const PLANT_GROUP_API = "http://localhost:3001/plantlist/get-all-plant-groups"

// const MyPlants = ({isAuthenticated}) => {

//     const [plantData, setPlantData] = useState([]);
//     const [refreshData, setRefreshData] = useState(false);

//     const navigate = useNavigate();
//     const handleClick = () => {
//         navigate("/create-plant-group")
//     }
//     const user_id = parseInt(localStorage.getItem("user_id"),10);


//      // Checks if token is available, otherwise redirect
//      useEffect(() => {
//         if (!isAuthenticated) {
//         navigate("/");
//         }
//     }, [isAuthenticated, navigate]);



//     // fetch all existing plantgroup based on the user_id
//     useEffect(()=> {
//         console.log("User_id in plantlist:", user_id);
//         async function fetchPlantGroup() {
//             try{
//                 const response = await axios.get(`${PLANT_GROUP_API}/user/${user_id}`);
//                 const plantCluster = response.data;
//                 // console.log("plantCluster Data is", plantCluster.plantGroups);
//                 setPlantData(plantCluster.plantGroups)

//             }catch(err){
//                 console.error("Error getting the plangroups API:", err)
//             }
//         }
//         fetchPlantGroup();
//     }, [user_id, refreshData])


//     const handleEdit = (groupId) => {
//         console.log("you clicked the edit button!");
//         navigate(`/edit-plant-group/${groupId}`)
//     };


//     const handleDelete = async(group_name) => {
//         try{
//             await axios.delete(`http://localhost:3001/plantlist/${group_name}`);
//             console.log("Deleted in myPlants:", group_name);

//             // refetch the plant Groups data after hitting the delete button
//             const response = await axios.get(PLANT_GROUP_API);
//             setPlantData(response.data.plantGroups);
//             setRefreshData(!refreshData);
//         }catch(err){
//             console.error("Error deleting plant group", err)
//         }
//     };


//     return(
//         <div>
//             <h1>This is the My Plants page!</h1>

//             <button onClick={handleClick}> Create Plant Group</button>

//         <ul>
//             {plantData.map((cluster, index)=> (
                    
//                         <li key ={index}>
//                             <h3>Name: {cluster.group_name}</h3>
//                             <p>About: {cluster.description}</p>
//                             {/* <p>ID: {cluster.my_plant_group_id}</p> */}
//                             <button onClick={()=> handleEdit(`${cluster.my_plant_group_id}`)}>Edit</button>
//                             <button onClick={()=> handleDelete(`${cluster.group_name}`)}>Delete</button>
//                         </li>
                    
//                 ))}
//         </ul>
            
            
//         </div>
//     )
// }

// export default MyPlants;