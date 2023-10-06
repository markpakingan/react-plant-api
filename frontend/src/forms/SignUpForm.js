
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"


const SignUpForm = () => {
    const initialState = {
        username: "",
        password: "",
        firstName: "", 
        lastName:"", 
        email: "", 
        imageUrl:""
    }

    const API_URL = "http://localhost:3001";
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
            const response = await axios.post(`${API_URL}/auth/register`, formData); 
            console.log("registration successful!", response);
            setFormData(initialState);
            navigate("/")

        }catch(err){
            console.error(err)
        }
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

            <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder ="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder ="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="text"
                name="email"
                placeholder ="email"
                value={formData.email}
                onChange={handleChange}
            />

            <label htmlFor="imageUrl">Image URL</label>
            <input
                id="imageUrl"
                type="imageUrl"
                name="imageUrl"
                placeholder ="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
            />

            <button>Submit</button>

        </form>
    )
}

export default SignUpForm;

