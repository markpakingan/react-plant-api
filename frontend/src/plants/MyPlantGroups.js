import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./myPlantGroup.css";

const BASE_URL = "http://localhost:3001/plantlist";
const PLANT_GROUP_API = "http://localhost:3001/plantlist/get-all-plant-groups";

const MyPlantGroups = ({ isAuthenticated }) => {
  const [plantData, setPlantData] = useState([]);
  const [refreshData, setRefreshData] = useState(false); // State variable to trigger useEffect
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/create-plant-group");
  };
  const user_id = parseInt(localStorage.getItem("user_id"), 10);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };


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
        const response = await axios.get(`${PLANT_GROUP_API}/user/${user_id}
        ?username=${username}`, 
        config);
        const plantCluster = response.data;
        setPlantData(plantCluster.plantGroups);
      } catch (err) {
        console.error("Error getting the plant groups API:", err);
      }
    }
    fetchPlantGroup();
  }, [user_id, refreshData, config, username]); // Add refreshData to the dependency array

  const handleEdit = (groupId) => {
    navigate(`/edit-plant-group/${groupId}`);
  };

  // deletes the selected groupname
  const handleDelete = async (group_name) => {
    try {
      await axios.delete(`http://localhost:3001/plantlist/${group_name}?username=${username}`, config);


      console.log("Deleted in myPlantGroups:", group_name);
      // Trigger useEffect by changing the state variable
      setRefreshData(!refreshData);
    } catch (err) {
      console.error("Error deleting plant group", err);
    }
  };

  return (
    <div>
      <h1>Here Are Your Plant Groups:</h1>

      <button onClick={handleClick} className="create-button"> Create Plant Group</button>

      <div>
          {plantData.map((cluster, index) => (
            <div key={index} className="list-item">
              <h3>{cluster.group_name}</h3>
              <p className="group-description">(Description): {cluster.description}</p>
              <button className="edit-button" onClick={() => handleEdit(`${cluster.my_plant_group_id}`)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(`${cluster.group_name}`)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyPlantGroups;


