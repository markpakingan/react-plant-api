import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./myReviews.css"

const Myreviews = ({isAuthenticated}) => {

    const PLANT_REVIEWS_URL = "http://localhost:3001/plantlist/get-review";
    const PLANT_GROUP_URL = "http://localhost:3001/plantlist/group"
    const navigate = useNavigate();
    const user_id = localStorage.getItem("user_id");
    const [reviewList, setReviewList] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  


     // Checks if token is available, otherwise redirect
     useEffect(() => {
        console.log("user_id in myreviews:", user_id);
        if (!isAuthenticated) {
        navigate("/");
        }
    }, [isAuthenticated, navigate]);


    // fetch all plant reviews with specific user_id
    useEffect(() => {


        const fetchPlantReviews = async () => {
          try {
            const response = await axios.get(`${PLANT_REVIEWS_URL}/user/${user_id}?username=${username}`, 
            config);

            const plantReviews = response.data.response;
            // console.log("plantReviews Data in myreviews:", plantReviews);
            const reviewsWithGroupName = [];
            for (const review of plantReviews) {
              try {
                const groupResponse = await axios.get(`${PLANT_GROUP_URL}/${review.my_plant_group_id}?username=${username}`, 
                config);

                const groupName = groupResponse.data.group.group_name;
                reviewsWithGroupName.push({ ...review, groupName });
              } catch (error) {
                console.error(`Failed to fetch group details for review ID ${review.my_plant_group_id}`);
              }
            }
      
            setReviewList(reviewsWithGroupName);
          } catch (err) {
            console.error("failed to fetch reviews in myreviews", err);
          }
        };
      
        fetchPlantReviews();
      }, [user_id, refreshData]);


      //deletes a review based on group_id
      const handleDelete = async(my_plant_group_id) => {

        try{
            const response = await axios.delete(`${PLANT_GROUP_URL}/${my_plant_group_id}?username=${username}`, 
            config);
            console.log("Deleted:", response );
            setRefreshData(!refreshData)
        }catch(err){
            console.error("failed to delete data in my reviews!", err)
        }
 
      }
      
    return(
        <div>
            <h1><i>"Share Your Plant-tastic Reviews Here!"</i></h1>

            
            <Link to="/create-review">
                <button className="review-button">
                    Create Review
                </button>
            </Link>

            {reviewList.map((review)=> (
                <div className="review-list">
                    
                    <div key={review.plant_group_plants_review_id}>
                        <div>Group Name: {review.groupName}</div>
                        <div>Rating: {review.rating}</div>
                        <div>Review: {review.review}</div>
                    </div>
                    <button className="delete-button" onClick={()=> handleDelete(review.my_plant_group_id)}>Delete</button>
                </div>
            ))}

        </div>
    )
}

export default Myreviews;

