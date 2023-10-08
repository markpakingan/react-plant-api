import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3001";


const PlantGroupForm = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const initialState = {
        groupName: "",
        description: ""
    }


    const [formData, setFormData] = useState(initialState)


    // Check if ID is available and get the prefilled value
    useEffect(()=> {
        async function fetchPlantGroup() {
            
            if(id) {

                try{    
                    const response = await axios.get(`${API_URL}/plantlist/group/${id}`);
                    const {group_name, description} = response.data.group;

                    setFormData({groupName: group_name, description: description});

                }catch(err){
                    console.error("Failed to fetchPlantGroup Data", err )
                }
            }
        };
        fetchPlantGroup();
    }, [id]);



    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData=> ({
            ...formData,
            [name]:value
        }));
    }

    // If ID is available, update the content, otherwise create another
    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("formData value:", formData);
                    
            try {

                if(id){
                    // If ID is available, it's an edit mode, send a PUT request to update
                    const response = await axios.put(`${API_URL}/plantlist/group/update/${id}`, formData);
                    console.log("update successful!", response);
                    navigate('/myplants');
                }else {
                    // Send a post request if no ID is found
                    const response = await axios.post(`${API_URL}/plantlist/group/create`, formData);
                    console.log("Plant group created!", response);
                    navigate('/myplants');

                }
         
            } catch (error) {
                console.error('Failed to create plant group', error);
            }    

    };
    
    return(

        <div>
            

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="groupName">Group Name</label>
                    <input
                        id="groupName"
                        type="text"
                        name="groupName"
                        placeholder ="enter group name"
                        value={formData.groupName}
                        onChange={handleChange}
                    />
                </div>


                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        type="text"
                        name="description"
                        placeholder ="(Optional)"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
        
                <button type="submit"> { id ? "Update" : "Create"}! </button>

            </form>
    

        </div>
    )

}

export default PlantGroupForm;