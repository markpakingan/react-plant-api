import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./plantGroupForm.css"

const API_URL = "http://localhost:3001";


const PlantGroupForm = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const user_id = parseInt(localStorage.getItem("user_id"),10);
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    

    const initialState = {
        user_id: null,
        groupName: "",
        description: ""
    }

    
    const [formData, setFormData] = useState(initialState)


    useEffect(() => {
        // const user_id = parseInt(localStorage.getItem("user_id"), 10);
        if (user_id) {
            setFormData(prevState => ({
                ...prevState,
                user_id: user_id
            }));
        }
    }, []); 


    // Check if ID is available and get the prefilled value
    useEffect(()=> {

        console.log("user_id value in LS in PlantGroupForm:", user_id);
        async function fetchPlantGroup() {
        
            if(id) {
                try{    
                    const response = await axios.get(`${API_URL}/plantlist/group/${id}?username=${username}`, config);
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

                formData.username = username;

                if(id){
                    // If ID is available, it's an edit mode, send a PUT request to update
                    const response = await axios.put(`${API_URL}/plantlist/group/update/${id}`, formData, config)
         
                    console.log("update successful!", response);
                    navigate('/my-plant-groups');
                }else {
                    // Send a post request if no ID is found
                    const response = await axios.post(`${API_URL}/plantlist/group/create`, formData, config);
                    console.log("Plant group created!", response);
                    navigate('/my-plant-groups');

                }
         
            } catch (error) {
                console.error('Failed to create plant group', error);
            }    

    };
    
    return(

        <div>
            

            <form onSubmit={handleSubmit} className="form-container">
            
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


                <div className="form-description">
                    <label htmlFor="description">Description</label>
                    <textarea
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