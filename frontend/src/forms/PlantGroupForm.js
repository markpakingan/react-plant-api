import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:3001";


const PlantGroupForm = () => {

    const navigate = useNavigate();
    const initialState = {
        groupName: "",
        description: ""
    }


    const [formData, setFormData] = useState(initialState)


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData=> ({
            ...formData,
            [name]:value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formData value:", formData);
        try {
            // Send a POST request to the backend API endpoint
            const response = await axios.post(`${API_URL}/plantlist/create`, formData);

            console.log("registration successful!", response);
            console.log("formdata data:", formData);
            navigate('/myplants');

        } catch (error) {
            console.error('Failed to create plant group', error);
        }
    };
    
    return(

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
     
            <button> Create! </button>

        </form>
    )


}

export default PlantGroupForm;