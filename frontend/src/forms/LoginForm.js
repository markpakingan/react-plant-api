import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = ({setIsAuthenticated, setUsername, setToken}) => {

    const initialState = {
        username: "",
        password: ""
    }


    const navigate = useNavigate();

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

        //make an API call to send formData to backend
        e.preventDefault();
        const response = await axios.post(API_AUTH_URL, formData);

        //Gets the value of the token
        const token = response.token;
        const username = formData.username;

        console.log("Token Value:", response.data);
        // console.log("Token:", token);

        setIsAuthenticated(true);
        setToken(token);
        setUsername(username)
        
        setFormData(initialState);
        navigate("/")
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">username</label>
            <input
                id="username"
                type="text"
                name="username"
                placeholder ="username"
                value={formData.username}
                onChange={handleChange}
            />

            <label htmlFor="password">password</label>
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
    )
}

export default LoginForm;