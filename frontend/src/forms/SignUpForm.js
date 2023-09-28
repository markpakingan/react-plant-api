
import React, {useState} from "react";

const SignUpForm = () => {
    const initialState = {
        username: "",
        password: "",
        firstName: "", 
        lastName:"", 
        email: "", 
        imageUrl:""
    }


    const [formData, setFormData] = useState(initialState)

    const handleChange = (e)=> {
        const {name, value} = e.target;
        setFormData(formData=> ({
            ...formData,
            [name]:value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Submit button working!")
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
                type="firstName"
                name="text"
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

