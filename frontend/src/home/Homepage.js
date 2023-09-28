import React, {useState} from "react";
import {Link} from "react-router-dom";
import SearchForm from "../forms/SearchForm";

const Home = () => {

    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (results) => {
        setSearchResults(results)
    }

    return(
        <div>

            <h1> This is the Home page </h1>
            
            <Link to = "/login">
                <button>Log In</button>
            </Link>

            <Link to = "/signup">
                <button>Sign Up</button>
            </Link>


            <SearchForm onSearch={handleSearch}/>

            <div>
                <ul>
                    {searchResults.map((result)=> (
                        <li key ={result.id}> {result.name} </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default Home; 