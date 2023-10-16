import React, {useState,useEffect} from "react";



const ReviewForm = () => {

    const initialState = {
        my_plant_group_id:"",
        user_id: "",
        rating: "", 
        review: ""
    }

    const [formData, setFormData] = useState(initialState);
    const user_id = parseInt(localStorage.getItem("user_id"), 10);
    const [existingPlantGroup ,setExistingPlantGroup] = useState([]);
    

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData=> ({
            ...formData,
            [name]:value
        }));
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        console.log("formData in Review Form", formData);
    }

    return(
        <div>
            

            <form onSubmit={handleSubmit}>
                <div>
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
                    <label htmlFor="plantgroup">Plant Group</label>
                    <select
                        id="plantgroup"
                        name="plantgroup"
                        value={formData.plantgroup}
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