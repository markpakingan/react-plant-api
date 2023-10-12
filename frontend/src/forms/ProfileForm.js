import axios from "axios";
import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const ProfileForm = ({ isAuthenticated, userName, token}) => {

  
  const initialState = {
    username:"", 
    firstname:"", 
    lastname:"",
    email:"",
    imageurl:"",
  };

  const [formData, setFormData] = useState(initialState)
  const navigate = useNavigate();


  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(formData => ({
        ...formData, 
        [name]:value
    }));
}

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(
        `http://localhost:3001/user/${userName}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("response.data", response.data);
      if (response.data) {
        // Update each field individually
        setFormData((prevData) => ({
          ...prevData,
          username: response.data.username,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          imageurl: response.data.imageurl
        }));
        
        
        console.log("Profile updated successfully!", response.data);
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };


  //Gets the user info from the backend and return to forms
  useEffect(() => {
    console.log("the Prop userName is:", userName);
    const fetchUserInfo = async () => {
      try {
        // Make a GET request to fetch user information
        const response = await axios.get(`http://localhost:3001/user/${userName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Set the user information in the component's state
        setFormData({
          username: response.data.user.username,
          firstname: response.data.user.firstname,
          lastname: response.data.user.lastname,
          email: response.data.user.email,
          imageurl: response.data.imageurl
        });

      } catch (error) {
        console.error("Error fetching user information", error);
      }
    };
  
    if (userName) {
      fetchUserInfo();
    }
  }, [userName, token]);


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);


  return (
    <div>
      <h1>Profile</h1>
                    
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="userName"> Username</label>
                        <input 
                            id="username"
                            type="text"
                            name="username"
                            placeholder="username"
                            value={formData.username}
                            onChange={handleChange}
                        /> 
                        <label htmlFor="firstname"> Firstname</label>
                        <input 
                            id="firstname"
                            type="text"
                            name="firstname"
                            placeholder="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                        /> 

                        <label htmlFor="lastname"> Last Name</label>
                        
                        <input 
                            id="lastname"
                            type="text"
                            name="lastname"
                            placeholder="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                        /> 
                        <label htmlFor="email"> Email</label>
                    
                        <input 
                            id="email"
                            type="text"
                            name="email"
                            placeholder="email"
                            value={formData.email}  
                            onChange={handleChange}
                        /> 

                          <label htmlFor="imageurl"> Image URL</label>
                          
                          <input 
                              id="imageurl"
                              type="text"
                              name="imageurl"
                              placeholder="imageurl"
                              value={formData.imageurl}  
                              onChange={handleChange}
                          /> 

                              <button onSubmit={handleSubmit}> Save Changes</button>
                          </form>                
    </div>
  )
};

export default ProfileForm;
