import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./loginForm.css"

const LoginForm = ({setIsAuthenticated, setToken, setAvatarImage}) => {

    const initialState = {
        username: "",
        password: ""
    }


    const navigate = useNavigate();

    const BASE_URL = "http://localhost:3001"
    const API_AUTH_URL =("http://localhost:3001/auth/token");
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e)=> {
        const {name, value} = e.target;
        setFormData(formData=> ({
            ...formData,
            [name]:value
        }));
    }

    const handleSubmit = async(e) => {


        try{
            //make an API call to send formData to backend
        e.preventDefault();
        const response = await axios.post(API_AUTH_URL, formData);
        const token = response.data.token;
        const user_id = response.data.user;

        
        console.log("user_id in LoginForm:", user_id);
        console.log("token in LoginForm:", token);
        console.log("username in LoginForm:", formData.username);

        localStorage.setItem("token", token);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("username", formData.username);
        
        setIsAuthenticated(true);
        setToken(token);
        setFormData(initialState);
        fetchUserAvatar(formData.username);
        // setUsername(formData.username);
        // setUserId(user_id);
        
        navigate("/")
        }catch(err){
            console.error("Failed to Login on Login Form!", err);
            alert("Incorrect Login: Try Again or Sign Up!");
            navigate("/");
        }
        
    }


    const fetchUserAvatar = async(userName)=> {

        try{
          const response = await axios.get(`${BASE_URL}/user/${userName}`);
          console.log("fetched username data", response.data.user);

          const imageUrl = response.data.user.imageurl;
          setAvatarImage(imageUrl)
        //   console.log("image url:", imageUrl);
        
    
        }catch(err){
          console.error("failed to fetch avatar in homepage", err)
        }
      };
  

    return (

        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username"></label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder ="username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <label htmlFor="password"></label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder ="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button>Submit</button>
                
            </form>

            <a href="/signup"><p>Or Sign-Up to Create an Account</p></a>
        </div>
        
    )
}

export default LoginForm;