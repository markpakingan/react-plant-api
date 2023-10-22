import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ReviewForm = () => {

    const PLANTGROUP_URL = "http://localhost:3001/plantlist/get-all-plant-groups";
    const PLANT_REVIEW_URL = "http://localhost:3001/plantlist/create-review";

    const user_id = parseInt(localStorage.getItem("user_id"), 10);
    const navigate = useNavigate();

    const initialState = {
        my_plant_group_id:"",
        user_id: user_id,
        rating: "", 
        review: ""
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
        e.preventDefault();
        const response = await axios.post(PLANT_REVIEW_URL, formData);
        console.log("formData in Review Form", formData);
        console.log("response in Review Form", response);
        navigate("/myreviews")
    }


    useEffect (()=> {
        console.log("user_id in my reviews", user_id);
        
        const fetchPlantGroup = async()=> {
            try{
                const response = await axios.get(`${PLANTGROUP_URL}/user/${user_id}`);
                const plantGroupData = response.data.plantGroups;
                console.log("plantGroupData:", plantGroupData);
                setExistingPlantGroup(plantGroupData)

            }catch(err){
                console.err("Failed to fetch plant group in review form", err)
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