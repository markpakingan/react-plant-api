import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./myGardenPicks.css"

const MyGardenPicks = ({ isAuthenticated }) => {

  const BASE_URL = "http://localhost:3001/plantlist";
  const navigate = useNavigate();
  const [groupedPlants, setGroupedPlants] = useState({}); // State to store grouped plants
  const [groupNames, setGroupNames] = useState({}); // State to store group names
  const user_id = localStorage.getItem("user_id");
  const [refreshData, setRefreshData] = useState(false);

  

  // Checks if token is available, otherwise redirect
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Fetch all plants for a specific plant group based on user_id
  useEffect(() => {
    async function fetchPlantBullets() {
      try {
        const response = await axios.get(
          `${BASE_URL}/fetch-all-plant-per-group/${user_id}`
        );

        const plantBulletData = response.data.plantListBullets;

        // Group plants based on group_id
        const groupedPlantsObject = plantBulletData.reduce((acc, plant) => {
          const { group_id, ...rest } = plant;
          if (!acc[group_id]) {
            acc[group_id] = [];
          }
          acc[group_id].push(rest);
          return acc;
        }, {});

        setGroupedPlants(groupedPlantsObject);
      } catch (err) {
        console.error("Failed to fetch plant list for Groups", err);
      }
    }
    fetchPlantBullets();
  }, [user_id, refreshData]);


  // Fetch all existing plant groups based on the user_id
  useEffect(() => {
    async function fetchPlantGroup() {
      try {
        const response = await axios.get(
          `${BASE_URL}/get-all-plant-groups/user/${user_id}`
        );

        const plantGroups = response.data.plantGroups;

        // Create a dictionary-like object with group IDs as keys and group names as values
        const groupNamesObject = {};
        plantGroups.forEach((group) => {
          groupNamesObject[group.my_plant_group_id] = group.group_name;
        });

        setGroupNames(groupNamesObject);
        console.log("groupNamesObject value in mygardenpicks", groupNamesObject);
      } catch (err) {
        console.error("Failed to fetch groups on MyGardenPicks", err);
      }
    }

    fetchPlantGroup();
  }, [user_id, refreshData]);


  const handleDelete = async(my_plant_group_plants_id)=> {
    const response = await axios.delete(`${BASE_URL}/delete-plant-pick/${my_plant_group_plants_id}`);
    console.log("plant deleted!", response);
    setRefreshData(true);
  };

  

  return (
    <div>
      <h1>Check Out Your Top Garden Picks!</h1>

      {Object.keys(groupedPlants).map((groupId) => (
        <div key={groupId} className="plant-name-container">

          <h2>{groupNames[groupId]}</h2>
          
          <ul>
            {groupedPlants[groupId].map((plant, index) => (
              <li key={index}>
              <a href={`/plantlist/${plant.plant_true_id}`}>
                 {plant.common_name} 
              </a>
                <button onClick={()=>
                handleDelete(plant.my_plant_group_plants_id)} 
                className="delete-button">delete</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyGardenPicks;
