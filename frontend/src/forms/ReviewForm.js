import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./reviewForm.css"


const ReviewForm = () => {


    const BASE_URL = "http://localhost:3001";

    const user_id = parseInt(localStorage.getItem("user_id"), 10);
    const navigate = useNavigate();
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
        };

    const initialState = {
        my_plant_group_id:"",
        user_id: user_id,
        rating: "", 
        review: "",
        username: username
    };


    const [formData, setFormData] = useState(initialState);
    const [existingPlantGroup ,setExistingPlantGroup] = useState([]);
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData=> ({
            ...formData,
            [name]:value, 
        }));
    }
    
    const handleSubmit = async(e)=> {

        if (!formData.my_plant_group_id || !formData.rating || !formData.review) {
            alert("All fields are required!");
            return;
        }

        try{    
            e.preventDefault();
        const response = await axios.post(`${BASE_URL}/plantlist/create-review`, formData, config);
        console.log("formData in Review Form", formData);
        console.log("response in Review Form", response);
        navigate("/myreviews")
        }catch(err){
            console.error("Failed to submit form in ReviewForm", err);
            
        }
        
    }



    useEffect (()=> {
        console.log("user_id in my reviews", user_id);
        
        const fetchPlantGroup = async()=> {
            try{
                const response = await axios.get(`${BASE_URL}/plantlist/get-all-plant-groups/user/${user_id}
                ?username=${username}`,config);

                const plantGroupData = response.data.plantGroups;
                console.log("plantGroupData:", plantGroupData);
                setExistingPlantGroup(plantGroupData);

            }catch(err){
                console.error("Failed to fetch plant group in review form", err);

            }
        }

        fetchPlantGroup();
    },[])


    return(
        <div>
            

            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        
                        <label htmlFor="my_plant_group_id">Plant Group</label>
                        <select
                            id="my_plant_group_id"
                            name="my_plant_group_id"
                            value={formData.my_plant_group_id}
                            onChange={handleChange}
                        >
                        <option value="">Select Plant Group</option>
                        {existingPlantGroup.map((group)=>(
                            <option key={group.my_plant_group_id}
                            value={group.my_plant_group_id}>
                                {group.group_name}
                            </option>

                        ))}
                        </select>
                    </div>
                    
                        <label htmlFor="rating">Rating</label>
                        <select
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                        >
                            <option value>Rate Plant (1 lowest - 5 highest)</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="review">Review</label>
                        <input
                            id="review"
                            type="text"
                            name="review"
                            placeholder ="Enter Review Here"
                            value={formData.review}
                            onChange={handleChange}
                        />
                    </div>
            
                    <button type="submit"> Create </button>

                </form>

        </div>
    )

    
}

export default ReviewForm;