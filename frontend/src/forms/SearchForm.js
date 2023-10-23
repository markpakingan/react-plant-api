import React, {useState} from "react";
import axios from "axios";


const SearchForm = ()=> {
    
    const [query, setQuery] = useState("");
    const BASE_URL = "http://localhost:3001/plantlist";
    const [searchResults, setSearchResults] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault();

        console.log("query in search form:", query);

        try {
            const response = await axios.get(`${BASE_URL}/search`, {
            params: {query: query}
        });
            console.log("success! sent data", response);

            // setSearchResults(response.data.plant);
            // // const searchedPlantData = response.data.plant.data;
            // // console.log("here's the result:", searchedPlantData);
            // console.log("search result", response.data.plant);

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