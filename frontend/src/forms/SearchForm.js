import React, {useState} from "react";
import axios from "axios";


const SearchForm = ({onSearch})=> {
    
    const [query, setQuery] = useState("");



    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`/plantlist&q=${query}`);
            onSearch(response.data.plant.data)
            console.log("here's the result:", response.data.plant.data);

        }catch(err){
            console.error("Error Responded",err)
        }
    }
    return(

        <form onSubmit={handleSubmit}>
            <label htmlFor="search"></label>
            <input
                id="search"
                type="text"
                name="search"
                placeholder ="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button> search </button>
        </form>
    )

}

export default SearchForm;