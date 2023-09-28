import React, {useState, useEffect} from "react";




const LoginForm = () => {

    const initialState = {
        username: "",
        password: ""
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

            <button>Submit</button>

        </form>
    )
}

export default LoginForm;