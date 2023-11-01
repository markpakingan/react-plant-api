
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./signUpForm.css"


const SignUpForm = () => {
    const initialState = {
        username: "",
        password: "",
        firstName: "", 
        lastName:"", 
        email: "", 
        imageUrl:""
    }

    const BASE_URL  = "http://localhost:3001";
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialState)

    const handleChange = (e)=> {
        const {name, value} = e.target;
        setFormData(formData=> ({
            ...formData,
            [name]:value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            console.log("FormData Value:", formData);
            const response = await axios.post(`${BASE_URL}/auth/register`, formData); 
            console.log("registration successful!", response);
            setFormData(initialState);
            alert("Account Created! Please Continue To Login!");
            navigate("/login")

        }catch(err){
            console.error(err)
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username"></label>
            <input
                id="username"
                type="text"
                name="username"
                placeholder ="Username"
                value={formData.username}
                onChange={handleChange}
            />

            <label htmlFor="password"></label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder ="Password"
                value={formData.password}
                onChange={handleChange}
            />

            <label htmlFor="firstName"></label>
            <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder ="First Name"
                value={formData.firstName}
                onChange={handleChange}
            />

            <label htmlFor="lastName"></label>
            <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder ="Last Name"
                value={formData.lastName}
                onChange={handleChange}
            />

            <label htmlFor="email"></label>
            <input
                id="email"
                type="text"
                name="email"
                placeholder ="E-mail"
                value={formData.email}
                onChange={handleChange}
            />

            <label htmlFor="imageUrl"></label>
            <input
                id="imageUrl"
                type="imageUrl"
                name="imageUrl"
                placeholder ="Image URL"
                value={formData.imageUrl}
                onChange={handleChange}
            />

            <button>Submit</button>

        </form>
    )
}

export default SignUpForm;

