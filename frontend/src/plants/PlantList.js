import React, {useEffect, useState} from "react";
import axios from "axios";

const PlantList = () => {


const PLANTLIST_DATA_API = "http://localhost:3001/plantlist";
const [plantList, setPlantList] = useState([]);


useEffect(()=>{
    async function fetchPlantList() {

        try{

            const response = await axios.get(PLANTLIST_DATA_API)
            const plantData = response.data;
            setPlantList(plantData.plant.data)
            console.log("plantlist data:",plantData.data);

        }catch(err){
            console.log("Error fetching plants:", err)
        }

    }

    fetchPlantList();
}, [])

    return (
        <div>
            <h1>Check Out Some Plants!</h1>

            <ul>
                {plantList.map((plant)=> (
                    <div>
                        <li key={plant.id}>Name: {plant.common_name}</li>
                        <li>Scientific Name: {plant.scientific_name}</li>
                        <li>Cycle: {plant.cycle}</li>
                        <li>
                            {plant.default_image ? (<img src={plant.default_image.thumbnail} 
                            alt={plant.common_name} />) : 
                            ("")
                            }
                        </li>
                        <button>Add To List</button>
                    </div>

                ))}
            </ul>
        </div>
    )
}



export default PlantList;