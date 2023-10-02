import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


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

    const handleSubmit = () => {
        alert("Plant Group Created!")
        navigate("/myplants")
    }

    
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